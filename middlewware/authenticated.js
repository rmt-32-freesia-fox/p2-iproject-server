const { tokenDecode } = require("../helpers")
const { User } = require('../models')

const authenticated = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if (!access_token) throw { name: 'Unauthenticated' }
    const payload = tokenDecode(access_token)

    const user = await User.findByPk(payload.id)

    if (!user) throw { name: 'Unauthenticated' }

    req.user = {
      id: user.id,
      email: user.email
    }

    next()

  } catch (error) {
    next(error)
  }
}

module.exports = authenticated