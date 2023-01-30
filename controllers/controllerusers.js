const { decodeToken, encodeToken } = require('../helpers/jwt');
const { User } = require('../models');
class ControllerUsers {
  static async registerUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body;
      const regUser = await User.create({ username, email, password, phoneNumber, role: 'user' });
      res.status(201).json({
        message: 'Success create user',
        data: {
          id: regUser.id,
          username: regUser.username,
          email: regUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || email == '') throw { name: 'invalid_email' };
      if (!password || password == '') throw { name: 'invalid_password' };
      const resLogin = await User.findOne({ where: { email } });
      if (!resLogin) throw { name: 'invalid' };
      const Token = encodeToken({ id: resLogin.id });
      res.status(200).json({ access_token: Token, username: resLogin.username, role: resLogin.role });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ControllerUsers;
