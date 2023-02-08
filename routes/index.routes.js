const { Router } = require('express')
const auth = require('./auth.routes')
const profile = require('./profile.routes')
const link = require('./link.routes')
const home = require('./home.routes')
const user = require('./user.routes')
const logs = require('./logs.routes')
const err = require('../middlewares/error.middlewares')
const router = Router()

router.use('/auth', auth)
router.use('/profile', profile)
router.use('/link', link)
router.use('/home', home)
router.use('/user', user)
router.use('/logs', logs)
router.use(err)

module.exports = router