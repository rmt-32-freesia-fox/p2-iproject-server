const router = require('express').Router()
const foodRoute = require('./foodRoute')
const userRoute = require('./userRoute')

router.use(userRoute)
router.use('/foods', foodRoute)

module.exports = router