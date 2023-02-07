const { Router } = require('express')
const auth = require('./auth.routes')
const profile = require('./profile.routes')
const link = require('./link.routes')
const home = require('./home.routes')

const router = Router()

router.use('/auth', auth)
router.use('/profile', profile)
router.use('/link', link)
router.use('/home', home)

module.exports = router