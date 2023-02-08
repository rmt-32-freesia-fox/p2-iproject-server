const { Event, Subscribe, User } = require('../models')

class EventController {
  static async getEvents(req, res, next) {
    try {
      const event = await Event.findAndCountAll({ include: { model: Subscribe, include: User } })

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
      const event = await Event.findByPk(id)

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
      const { id } = req.user
      const { eventId } = req.params
      const user = await User.findByPk(id)
      if (!user) throw { name: 'NotFound' }

      await Subscribe.create({ UserId: id, EventId: eventId })

      res.status(201).json({ message: "Subscribe successfully" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = EventController