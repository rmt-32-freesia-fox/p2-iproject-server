const MyEventController = require('../controllers/MyEventController')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()

// router.get('/a', MyEventController.allEvent)
router.use(authentication)


module.exports = router