const EventController = require('../controllers/eventController')

const router = require('express').Router()

router.get('/', EventController.getEvents)
router.post('/', EventController.addEvent)
router.get('/:id', EventController.getById)
router.put('/:id', EventController.replaceEvents)
router.patch('/:id', EventController.updateStatus)
router.delete('/:id', EventController.deleteEvent)
router.post('/:eventId/subscibe', EventController.subscribe)

module.exports = router