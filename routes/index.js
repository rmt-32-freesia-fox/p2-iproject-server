const UserController = require('../controllers')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()
const animeplaylistrouter = require('../routes/animeplaylist')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/animefinder', UserController.animefinder)
// router.use(authentication)
router.use(animeplaylistrouter)

module.exports = router