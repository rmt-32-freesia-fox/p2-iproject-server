const { Router } = require('express')
const HomeController = require('../controllers/home.controllers')
const { authenticate } = require('../middlewares/auth.middlewares')

const router = Router()

router.get('/', authenticate, HomeController.home)

module.exports = router
