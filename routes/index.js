const router = require('express').Router()
const paymentRoute = require('./paymentRoute')
const foodRoute = require('./foodRoute')
const userRoute = require('./userRoute')
const authenticated = require('../middlewware/authenticated')
const eventRoute = require('./eventRoute')

router.use(userRoute)
router.use('/foods', foodRoute)
router.use('/events', eventRoute)

router.use(authenticated)
router.use(paymentRoute)

module.exports = router