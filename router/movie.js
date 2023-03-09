const express = require('express')
const MovieController = require('../controller/movieController')
const { authentification } = require('../middleware/authentification')
const router = express.Router()

router.get('/movies', MovieController.allMovie)
router.get('/movie/:id', MovieController.movieById)

router.use(authentification)
router.post('/generate-midtrans/:id', MovieController.midtransToken)
router.patch('/update-status/:id', MovieController.updateStatus)
router.get('/order/:movieId', MovieController.orderById)


module.exports = router