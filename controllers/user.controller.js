const { User, Github, Discord, Spotify } = require('../models')

class UserController {
  static async getMe(req, res, next) {
    try {
      const { id } = req.user
      const user = await User.findByPk(id, {
        include: [
          {
            model: Github,
            attributes: {
              exclude: ['access_token', 'refresh_token'],
            },
          },
          {
            model: Discord,
            attributes: {
              exclude: ['access_token', 'refresh_token'],
            },
          },
          {
            model: Spotify,
            attributes: {
              exclude: ['access_token', 'refresh_token'],
            },
          },
        ],
      })

      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  static async edit(req, res, next) {
    try {
      const { username, bio, name } = req.body
      const user = await User.findByPk(req.user.id)
      await user.update({ username, bio, name })
      res.json({ message: 'Updated!' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
