const { User, Github, Discord, Spotify } = require('../models')

class UserController {
  static async getMe(req, res, next) {
    try {
      const { id } = req.user
      const user = await User.findByPk(id)

      res.json(user)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
