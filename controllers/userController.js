const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { confirmationRegistered, confirmationSwitchStatus } = require("../helpers/nodemailer");
const { CLIENT_ID } = process.env;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body;
      const register = await User.create({ username, email, password, role: "customer", phoneNumber, status: "UnMember" });

      const content = `Hi Admin!, user with email ${register.email} has successfully registered, please check in Gymster App.`;
      const subject = `Information Registered`;
      confirmationRegistered(register, content, subject);

      res.status(201).json({
        message: `User with email ${email} has been succesfully registered`,
        data: {
          id: register.id,
          email: register.email,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        throw { name: "InvalidData" };
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "InvalidLogin" };
      } else {
        const isValid = comparePassword(password, user.password);

        if (!isValid) {
          throw { name: "InvalidLogin" };
        } else {
          const access_token = generateToken({
            id: user.id,
          });
          res.status(200).json({ access_token, username: user.username, role: user.role });
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async loginWithGoogle(req, res, next) {
    try {
      const token = req.headers["google-auth-token"];

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const { email, name } = payload;

      let [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: String(Math.random()),
          role: "customer",
        },
      });

      let message, code;
      if (created) {
        message = `User with email ${email} has been created`;
        code = 201;
      } else {
        message = `User with ${email} has been found`;
        code = 200;
      }

      const access_token = generateToken({
        id: user.id,
        role: user.role,
      });

      res.status(code).json({ message, access_token, username: name, role: "customer" });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
