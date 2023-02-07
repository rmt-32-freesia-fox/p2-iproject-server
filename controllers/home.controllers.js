const { Log, User, Link } = require('../models')

class HomeController {
  static async home(req, res, next) {
    try {
      let option = {
        where: { status: 'active' },
        include: [Link, User],
      }

      const page = req.query.page || 1

      const postPerPage = req.query.perPage || 10

      const offset = Math.max(+page - 1, 0) * postPerPage
      const limit = postPerPage

      option.offset = offset
      option.limit = limit

      const { count, rows } = await Log.findAndCountAll(option)
      res.json({
        totalPage: Math.ceil(count / postPerPage),
        currentPage: page,
        movies: rows,
      })
    } catch (error) {
      next(error)
    }
  }
}


module.exports = HomeController