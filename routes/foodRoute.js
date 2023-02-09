const FoodController = require('../controllers/foodController')

const router = require('express').Router()

router.get('/', FoodController.foods)
router.get('/ingredients', FoodController.ingredients)
router.get('/findByIngredients', FoodController.findByIngredients)
router.get('/:id', FoodController.informationFood)

module.exports = router