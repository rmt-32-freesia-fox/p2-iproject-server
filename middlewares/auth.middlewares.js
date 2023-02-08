const { verifyToken, noErrorVerifyToken } = require('../helpers/jwt')
const { User, Link } = require('../models')
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

const authenticatePublic = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    const payload = noErrorVerifyToken(access_token)
    if (!payload) {
      next()
      return
    }
    const user = await User.findByPk(payload.id)
    if (!user) throw { name: 'AuthenticationFailed', message: 'Invalid Token' }

    req.user = payload // { id }
    next()
  } catch (error) {
    next(error)
  }
}

const authorizeLink = async (req, res, next) => {
  try {
    const { id: UserId } = req.user
    const linkData = await Link.findOne({ where: { id: req.params.id } })
    if (!linkData) throw { nama: 'NotFound', message: 'Data not found' }

    if (linkData.UserId !== UserId)
      throw { name: 'ValidationError', message: 'Forbidden' }
    next()
  } catch (error) {
    next(error)
  }
}
module.exports = { authenticate, authenticatePublic, authorizeLink }
