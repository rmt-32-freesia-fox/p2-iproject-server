const router = require('express').Router()
const paymentRoute = require('./paymentRoute')
const foodRoute = require('./foodRoute')
const paymentRoute = require('./paymentRoute')
const userRoute = require('./userRoute')
const authenticated = require('../middlewware/authenticated')

router.use(userRoute)
router.use('/foods', foodRoute)
router.use('/events', eventRoute)

router.use(authenticated)
router.use(paymentRoute)

router.use(authenticated)
router.use(paymentRoute)

module.exports = router