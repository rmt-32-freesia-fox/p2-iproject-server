const { Router } = require('express')
const auth = require('./auth.routes')
const profile = require('./profile.routes')

const router = Router()

router.use('/auth', auth)
router.use('/profile', profile)

module.exports = router