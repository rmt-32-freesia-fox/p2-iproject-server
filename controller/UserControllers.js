const { comparePassword } = require('../helper/bycript');
const { createToken } = require('../helper/jwt');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const newUser = await User.create({ username, email, password });

      res.status(201).json({
        message: 'Success created user',
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: 'Not Found Email/Passowrd' };
      }

      const findUser = await User.findOne({ where: { email } });

      if (!findUser) {
        throw { name: 'Invalid email or password' };
      }

      const comparePass = comparePassword(password, findUser.password);

      if (!comparePass) {
        throw { name: 'Invalid email or password' };
      }

      const payload = {
        id: findUser.id,
      };

      const access_token = createToken(payload);

      res.status(200).json({
        message: 'Success Login',
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      //? token google dari req.headers
      const token = req.headers['google_token'];

      //? membuat object instance dari OAuth2Client
      const client = new OAuth2Client(GOOGLE_CLIENT_ID);

      //? verify google token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });

      //? get payload dari hasil verify

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: 'passwordGoogle',
        },
      });

      //? create token
      const access_token = createToken({
        id: user.id,
      });

      console.log(access_token);
      // mengirim response
      res.status(200).json({
        message: 'Success Login!',
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
