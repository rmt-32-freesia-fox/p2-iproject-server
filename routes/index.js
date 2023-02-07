const router = require('express').Router()
const paymentRoute = require('./paymentRoute')
const foodRoute = require('./foodRoute')
const userRoute = require('./userRoute')
const authenticated = require('../middlewware/authenticated')

router.use(userRoute)
router.use('/foods', foodRoute)

router.use(authenticated)
router.use(paymentRoute)

module.exports = router