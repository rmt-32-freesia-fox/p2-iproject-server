const { User } = require('../models');
const { compareHash } = require('../helpers/bcrypt.js');
const { createToken } = require('../helpers/jwt.js');

const { CLIENT_ID } = process.env;

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

class CustomerController {
  static async register(req, res, next) {
    const { name, email, password, role } = req.body;
    const input = { name, email, password, role: 'Customer' };
    try {
      const newUser = await User.create(input);
      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    // console.log(CLIENT_ID);
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw { name: 'EmailOrPasswordRequired' };
      }

      let user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: 'InvalidCredential' };
      }

      if (user) {
        if (user.role == 'Renter') {
          throw { name: 'CannotLogin' };
        }
      }

      let compared = compareHash(password, user.password);
      if (!compared) {
        throw { name: 'InvalidCredential' };
      }

      let payload = {
        id: user.id,
      };
      let access_token = createToken(payload);
      res.status(200).json({
        access_token,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      next(err);
    }
  }

  static async googleSignIn(req, res, next) {
    try {
      const token = req.headers['google-auth-token'];
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const { email } = payload;
      const name = payload.name;

      let [customer, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          name,
          email,
          password: String(Math.random()),
          role: 'Customer',
        },
      });

      let access_token;
      let message, code;
      if (created) {
        created = customer;
        access_token = createToken({ id: created.id });
        message = `Customer with email ${created.email} has been created`;
        code = 201;
        res.status(code).json({ id: created.id, name: created.name, message, access_token, email: created.email, role: created.role });
      } else {
        if (customer) {
          if (customer.role == 'Renter') {
            throw { name: 'CannotLogin' };
          }
        }
        access_token = createToken({ id: customer.id });
        message = `Customer with email ${customer.email} has been found`;
        code = 200;
        res.status(code).json({ id: customer.id, name: customer.name, message, access_token, email: customer.email, role: customer.role });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CustomerController;
