require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret_key = process.env.SECRET_KEY

module.exports = {
  hashPassword: (password) => bcrypt.hashSync(password, 12),
  comparePassword: (password, hash) => bcrypt.compareSync(password, hash),
  generateToken: (payload) => jwt.sign(payload, secret_key),
  tokenDecode: (token) => jwt.verify(token, secret_key)
}