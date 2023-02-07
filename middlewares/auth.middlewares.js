const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')
/**
 *
 * @type {import('express').RequestHandler}
 */
const authenticate = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    const { id } = verifyToken(access_token)
    const user = await User.findByPk(id)
    if (!user) throw { name: 'AuthenticationFailed', message: 'Invalid Token' }

    req.user = { id }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { authenticate }
