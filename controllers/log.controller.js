const { Op } = require('sequelize')
const { User, Log, Link, Following } = require('../models')

class LogController {
  static async log(req, res, next) {
    try {
      let option = { where: {}, include: [User, Link], order: [['id', 'desc']] }

      // pagination /?page=
      const page = req.query.page || 1

      const postPerPage = req.query.perPage || 10

      const offset = Math.max(+page - 1, 0) * postPerPage
      const limit = postPerPage

      option.offset = offset
      option.limit = limit
      const list = await Following.findAll({ where: { UserId: req.user.id } })
      const followings = list.map((follow) => follow.FollowId)

      followings.push(req.user.id)

      option.where.UserId = { [Op.or]: followings }

      const logs = await Log.findAndCountAll(option)
      res.json(logs)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = LogController
