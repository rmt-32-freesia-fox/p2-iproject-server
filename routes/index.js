const router = require('express').Router()
const foodRoute = require('./foodRoute')
const eventRoute = require('./eventRoute')
const paymentRoute = require('./paymentRoute')
const userRoute = require('./userRoute')
const authenticated = require('../middlewware/authenticated')
const chatController = require('../controllers/chatGpt')

router.use(userRoute)
router.use('/foods', foodRoute)
router.use('/events', eventRoute)
router.post('/chatgpt', chatController.chatGpt )

router.use(authenticated)
router.use(paymentRoute)

module.exports = router