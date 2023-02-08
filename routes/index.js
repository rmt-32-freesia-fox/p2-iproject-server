const UserController = require('../controllers')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()
const animeplaylistrouter = require('../routes/animeplaylist')
const myeventrouter = require('../routes/myevent')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/animefinder', UserController.animefinder)
router.get('/events', UserController.allEvent)
// router.use(authentication)
router.use(animeplaylistrouter)
router.use(myeventrouter)

module.exports = router