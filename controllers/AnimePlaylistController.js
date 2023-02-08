const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const axios = require('axios')

class AnimePlaylistController {
  static async allPlaylist(req, res, next) {
    try {
      let { username, email, password } = req.body;
      let role = "user";
      let user = await User.create({
        username,
        email,
        password,
        role,
      });
      res.status(201).json({username:user.username,email:user.email,role:user.role,});
    } catch (error) {
      next(error);
    }
  }

  static async createPlaylist(req, res, next) {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ where: { email } });

      if (!email || !password) {
        throw { name: "EmailOrPasswordRequired" };
      }

      if (!user) {
        throw { name: "InvalidCredentials" };
      }

      let isValid = await comparePassword(password, user.password);
      if (!isValid) {
        throw { name: "InvalidCredentials" };
      }
      let payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      let token = generateToken(payload);
      res.status(200).json({ access_token: token, username: user.username, role:user.role, userId: user.id });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AnimePlaylistController;
