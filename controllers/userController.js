if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

const { comparePassword, generateToken, hashPassword } = require('../helpers')

const { User } = require('../models')
const { CLIENT_ID } = process.env

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password, phoneNumber, address } = req.body
      const user = await User.create({ name, email, password: hashPassword(password), phoneNumber, address, role: 'customer' })

      res.status(201).json({
        message: 'Signed Up successfully',
        data: {
          id: user.id,
          email: user.email
        }
      })

    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email || !password) throw { name: "EmailPasswordRequired" }

      const error = {
        name: "InvalidLogin",
      }

      const user = await User.findOne({ where: { email } })

      if (!user) throw error

      if (!comparePassword(password, user.password)) throw error

      const access_token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role
      })

      res.status(200).json({
        message: 'Login Successfully',
        data: {
          access_token,
          id: user.id,
          username: user.username,
          role: user.role,
        }
      })

    } catch (error) {
      next(error)
    }

  }

  static async googleSignIn(req, res, next) {
    try {
      const token = req.headers["google-auth-token"]

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { email, name } = payload;

      const [user, created] = await User.findOrCreate({
        where: { email },
        fields: ['email', 'username', 'password', 'role'],
        defaults: {
          email, username: name, password: String(Math.random), role: 'staff'
        },
      })

      let code = 200
      let message = `user with email ${email} has been found`

      if (created) {
        code = 201
        message = `user with email ${email} has been created`
        user = created
      }

      const access_token = generateToken({
        id: user.id,
        email: user.email
      })

      res.status(code).json({ message, access_token, id: user.id, username: user.username, role: user.role })

    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController