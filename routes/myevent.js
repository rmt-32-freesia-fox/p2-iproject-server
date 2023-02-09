const MyEventController = require('../controllers/MyEventController')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()

router.use(authentication)
router.post('/myevents', MyEventController.createMyEvent)
router.get('/myevents', MyEventController.allMyEvent)


module.exports = router