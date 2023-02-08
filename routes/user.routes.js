const { Router } = require('express')
const UserController = require('../controllers/user.controller')
const { authenticate } = require('../middlewares/auth.middlewares')

const router = Router()

router.get('/', authenticate, UserController.getMe)

module.exports = router
