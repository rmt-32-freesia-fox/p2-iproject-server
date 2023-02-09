const { decodeToken, encodeToken } = require('../helpers/jwt');
const { mailer, mailercode } = require('../helpers/mailer');
const { User, Token } = require('../models');
const { Op } = require('sequelize');
const { OAuth2Client } = require('google-auth-library');
const { default: axios } = require('axios');
const CLIENT_ID = process.env.CLIENT_ID;

class ControllerUsers {
  static async registerUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body;
      const regUser = await User.create({ username, email, password, phoneNumber, role: 'user' });
      mailer(regUser.email);
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
  static async forGoogleLogin(req, res, next) {
    try {
      const code = req.body.code;
      const client = new OAuth2Client({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.ORIGIN_URL,
      });

      async function verifyCode(code) {
        let { tokens } = await client.getToken(code);
        client.setCredentials({ access_token: tokens.access_token });
        const userinfo = await client.request({
          url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        });
        return userinfo.data;
      }
      let ticket = await verifyCode(code);

      const { email, name } = ticket;
      const [user, create] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          username: name,
          password: Math.random().toString(),
          address: 'random road',
          phoneNumber: '110011',
          role: 'customer',
        },
      });
      if (create) {
        mailer(user.email);
      }
      res.status(200).json({
        access_token: encodeToken({ id: user.id, role: user.role }),
        username: user.username,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }
  static async githubLogin(req, res, next) {
    try {
      const { code } = req.query;

      const { data } = await axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token',
        data: {
          client_id: process.env.GITHUB_CLIENT,
          client_secret: process.env.GITHUB_SECRET,
          code: code,
        },
        headers: {
          accept: 'application/json',
        },
      });
      const github_token = data.access_token;
      const response = await axios({
        method: 'get',
        url: 'https://api.github.com/user',
        data: {
          'X-OAuth-Scopes': 'user',
          'X-Accepted-OAuth-Scopes': 'user',
        },
        headers: {
          Authorization: `token ${github_token}`,
        },
      });
      const githubUser = response.data;

      const { login, email } = githubUser;
      const [user, create] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          username: login,
          password: Math.random().toString(),
          phoneNumber: '110011',
          role: 'User',
        },
      });
      if (create) {
        mailer(user.email);
      }
      res.status(200).json({
        access_token: encodeToken({ id: user.id, role: user.role }),
        username: user.username,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }
  static async forToken(req, res, next) {
    try {
      const { token, email } = req.body;
      // console.log(token, email);
      const forToken = await Token.create({ code: token, email: email });
      if (forToken) {
        mailercode(email, forToken.code);
        res.status(200).json({ message: 'Token has been sent in your mail' });
      }
    } catch (error) {
      next(error);
    }
  }
  static async forReset(req, res, next) {
    console.log(req.body);
    try {
      const { email, password } = req.body;
      const code = req.body.token;
      const trueToken = await Token.findOne({ where: { code, email, status: false } });
      console.log(trueToken);
      if (!trueToken) throw { name: 'invalidToken' };
      const updatePassword = await User.update({ password: password }, { where: { email } });
      const updataToken = await Token.update({ status: true }, { where: { email } });
      res.status(200).json({ message: 'success update password' });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ControllerUsers;
