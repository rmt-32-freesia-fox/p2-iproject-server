const FoodController = require('../controllers/foodController')

const router = require('express').Router()

router.get('/', FoodController.foods)
router.get('/ingredients', FoodController.ingredients)
router.get('/:id', FoodController.informationFood)
router.get('/findByIngredients', FoodController.findByIngredients)

module.exports = router