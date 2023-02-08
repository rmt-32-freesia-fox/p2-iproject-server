const { Router } = require('express')
const LogController = require('../controllers/log.controller')
const { authenticate } = require('../middlewares/auth.middlewares')

const router = Router()

router.get('/', authenticate, LogController.log)

module.exports = router
