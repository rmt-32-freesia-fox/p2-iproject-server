const MidtransController = require('../controllers/midtransController')
const router = require('express').Router()

router.post('/payment-gateway', MidtransController.generateTokenMids)

module.exports = router