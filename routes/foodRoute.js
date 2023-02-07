const FoodController = require('../controllers/foodController')

const router = require('express').Router()

router.get('/', FoodController.foods)

module.exports = router