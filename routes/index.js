const UserController = require('../controllers')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use(authentication)

module.exports = router