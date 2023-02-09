"use strict";
const { comparePassword } = require("../helpers/bcrypt");
const { User, Auction, Image, History } = require("../models");
const { signToken, verifyToken } = require("../helpers/jwt");
const { client, verifyGoogle } = require("../helpers/gsi");
const axios = require("axios");

module.exports = class UserController {
  static async postRegister(req, res, next) {
    try {
      const { email, name, password } = req.body;
      const newUser = await User.create({
        email,
        name,
        password,
      });
      res
        .status(201)
        .json({ id: +newUser.id, name: newUser.name, email: newUser.email });
    } catch (err) {
      next(err);
    }
  }
  static async postLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "emptyEmail" };
      if (!password) throw { name: "emptyPassword" };
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) throw { name: "invalidLogin" };
      if (!comparePassword(password, user.password))
        throw { name: "invalidLogin" };
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      const access_token = signToken(payload);
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
  static async githubLogin(req, res, next) {
    try {
      const code = req.body.code;
      const { data } = await axios({
        method: "post",
        url: "https://github.com/login/oauth/access_token",
        data: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code,
        },
        headers: {
          accept: "application/json",
        },
      });
      const github_token = data.access_token;
      const response = await axios({
        method: "get",
        url: "https://api.github.com/user",
        data: {
          "X-OAuth-Scopes": "user",
          "X-Accepted-OAuth-Scopes": "user",
        },
        headers: {
          Authorization: `token ${github_token}`,
        },
      });
      const githubUser = response.data;
      if (!githubUser.email) throw { name: "emptyGithubEmail" };
      const [user, created] = await User.findOrCreate({
        where: { email: githubUser.email },
        defaults: {
          email: githubUser.email,
          name: githubUser.name,
          password: Math.floor(Math.random()),
        },
        hooks: false,
      });
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      const access_token = signToken(payload);
      let statusCode;
      if (created) {
        statusCode = 201;
      } else {
        statusCode = 200;
      }
      res.status(statusCode).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
};
