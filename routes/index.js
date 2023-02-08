const router = require('express').Router()
const foodRoute = require('./foodRoute')
const eventRoute = require('./eventRoute')

router.use(userRoute)
router.use('/foods', foodRoute)
router.use('/events', eventRoute)

module.exports = router