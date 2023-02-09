const { Event, Subscribe, User } = require('../models')
const { template } = require('../helpers/template')
const sendmail = require('../helpers/nodemailer')

class EventController {
  static async getEvents(req, res, next) {
    try {
      const opt = { include: { model: Subscribe, include: User } }
      if (req.query.number) opt.limit = req.query.number
      const event = await Event.findAndCountAll()

      res.status(200).json(event)
    } catch (error) {
      next(error)
    }
  }

  static async addEvent(req, res, next) {
    try {
      const { title, link, eventDate, imageUrl, desc, price } = req.body
      const event = await Event.create({ title, link, eventDate, imageUrl, desc, price })

      res.status(201).json({ message: 'Add event successfully ', data: event })
    } catch (error) {
      next(error)
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params
      const event = await Event.findByPk(id, { include: Subscribe })

      res.status(200).json(event)
    } catch (error) {
      next(error)
    }
  }

  static async deleteEvent(req, res, next) {
    try {
      const { id } = req.params
      const event = await Event.findByPk(id)

      if (!event) throw { name: 'NotFound' }

      await event.destroy()

      res.status(200).json({ message: `${event.title} success to delete` })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async replaceEvents(req, res, next) {
    try {
      const { id } = req.params
      const { title, link, eventDate, imageUrl, desc, price } = req.body
      const event = await Event.findByPk(id)

      if (!event) throw { name: 'NotFound' }

      await event.update({ title, link, eventDate, imageUrl, desc, price })

      res.status(200).json({ message: "Event has been updated" })
    } catch (error) {
      next(error)
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params
      const { status } = req.body
      const event = await Event.findByPk(id)
      if (!event) throw { name: 'NotFound' }

      event.status = status

      await Event.save()

      res.status(200).json({ message: "Event status has been updated" })
    } catch (error) {
      next(error)
    }
  }

  static async subscribe(req, res, next) {
    try {
      const { id, email, name } = req.user
      const { eventId } = req.params
      const event = await Event.findByPk(eventId)
      if (!event) throw { name: 'NotFound' }

      await Subscribe.create({ UserId: id, EventId: eventId })

      sendmail({ email }, template(event, name), 'Information course and link meet')
      res.status(201).json({ message: "Subscribe successfully" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = EventController