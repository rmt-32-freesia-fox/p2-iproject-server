const { createLog } = require('../helpers/logs')
const { User, Link } = require('../models')

class LinkController {
  static async add(req, res, next) {
    try {
      const { id: UserId } = req.user
      const { link, label, logo } = req.body

      const newLink = await Link.create({ UserId, link, label, logo })

      res.status(201).json(newLink)
      createLog('created', UserId, newLink.id)
    } catch (error) {
      next(error)
    }
  }

  static async detail(req, res, next) {
    try {
      const { id: UserId } = req.user
      const link = await Link.findByPk(req.params.id)
      if (!link) throw { name: 'NotFound', message: 'Data not found' }
      res.json(link)
    } catch (error) {
      next(error)
    }
  }

  static async edit(req, res, next) {
    try {
      const { link, label, logo } = req.body
      const { id } = req.params
      const linkData = await Link.findByPk(id)
      if (!linkData) throw { name: 'NotFound', message: 'Data not found' }

      const data = await linkData.update({ link, label, logo })
      res.json(data)
    } catch (error) {
      next(error)
    }
  }
  static async remove(req, res, next) {
    try {
      const { id } = req.params
      const linkData = await Link.findByPk(id)
      if (!linkData) throw { name: 'NotFound', message: 'Data not found' }

      await linkData.destroy()
      res.json({ message: 'Link deleted' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = LinkController
