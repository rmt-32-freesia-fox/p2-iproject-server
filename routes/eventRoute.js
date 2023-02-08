const EventController = require('../controllers/eventController')
const authenticated = require('../middlewware/authenticated')

const router = require('express').Router()

router.get('/', EventController.getEvents)
router.get('/:id', EventController.getById)

router.use(authenticated)
router.post('/', EventController.addEvent)
router.put('/:id', EventController.replaceEvents)
router.patch('/:id', EventController.updateStatus)
router.delete('/:id', EventController.deleteEvent)
router.post('/:eventId/subscibe', EventController.subscribe)

module.exports = router