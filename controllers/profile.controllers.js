const { User, Following, Link, Discord, Github, Spotify } = require('../models')

class ProfileController {
  static async detail(req, res, next) {
    try {
      const { username } = req.params
      if (username.toLowerCase() === 'callback') return res.send()

      const user = await User.findOne({
        where: { username },
        include: [
          { model: User, as: 'Followings', attributes: ['id'] },
          { model: User, as: 'Followers', attributes: ['id'] },
          Link,
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
      if (!user) throw { name: 'NotFound', message: 'User not found!' }

      const data = JSON.parse(JSON.stringify(user))

      data.followed = req.user
        ? !!data.Followers.find(({ id }) => id == req.user.id)
        : false
      data.following = req.user
        ? !!data.Followings.find(({ id }) => id == req.user.id)
        : false

      data.Followings = data.Followings.length
      data.Followers = data.Followers.length

      res.json(data)
    } catch (error) {
      next(error)
    }
  }
  static async detailFollowers(req, res, next) {
    try {
      const { username } = req.params
      const user = await User.findOne({
        where: { username },
        include: { model: User, as: 'Followers' },
      })
      if (!user) throw { name: 'NotFound', message: 'User not found!' }

      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  static async detailFollowings(req, res, next) {
    try {
      const { username } = req.params
      const user = await User.findOne({
        where: { username },
        include: { model: User, as: 'Followers' },
      })
      if (!user) throw { name: 'NotFound', message: 'User not found!' }

      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  static async follow(req, res, next) {
    try {
      const { id: UserId } = req.user
      const { username } = req.params
      const user = await User.findOne({ where: { username } })
      if (!user) throw { name: 'NotFound', message: 'User not found' }

      const FollowId = user.id

      const following = await Following.findOne({
        where: { UserId, FollowId },
      })
      if (following)
        throw { name: 'ValidationError', message: 'Already following' }

      await Following.create({ UserId, FollowId })
      res.status(201).json({ message: 'Following ' + user.username })
    } catch (error) {
      next(error)
    }
  }

  static async unfollow(req, res, next) {
    try {
      const { id: UserId } = req.user
      const { username } = req.params
      const user = await User.findOne({ where: { username } })
      if (!user) throw { name: 'NotFound', message: 'User not found' }

      const FollowId = user.id

      const following = await Following.findOne({
        wheren: { UserId, FollowId },
      })
      if (!following)
        throw {
          name: 'ValidationError',
          message: 'You are not following this user',
        }

      await following.destroy()
      res.status(200).json({ message: 'Unfollowing ' + user.username })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProfileController
