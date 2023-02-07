const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body;
      const register = await User.create({ username, email, password, role: "customer", phoneNumber, status: "UnMember" });

      res.status(201).json({
        message: `User with email ${email} has been succesfully registered`,
        data: {
          id: register.id,
          email: register.email,
        },
      });
    } catch (error) {
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
}
module.exports = Controller;
