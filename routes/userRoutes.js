const router = require('express').Router()
const UserController = require('../controllers/userController')


router.post('/register', UserController.register) //? register // DONE
router.post('/login', UserController.login) //? sign in reugler // DONE
router.post('/login-by-google', UserController.loginByGoogle) //? sign in dengan Google
router.post('/login-by-github', UserController.loginByGithub) //? sign in dengan Github
router.post('/login-by-facebook', UserController.loginByFacebook) //? sign in dengan Github

module.exports = router
