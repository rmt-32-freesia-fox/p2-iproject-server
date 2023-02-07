const UserController = require('../controllers/userController')

const router = require('express').Router()

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/google-sign-in', UserController.googleSignIn)

module.exports = router