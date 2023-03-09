const express = require('express')
const router = express.Router()
const user = require('./user')
const movie = require('./movie')


router.use(user)
router.use(movie)

module.exports = router