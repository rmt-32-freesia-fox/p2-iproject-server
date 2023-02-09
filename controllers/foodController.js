if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}


const { default: axios } = require("axios")
const { HOST_SPOON, API_KEY_SPOON } = process.env

class FoodController {
  static async foods(req, res, next) {
    try {
      const foods = await axios.get(`${HOST_SPOON}/recipes/complexSearch`, {
        params: { ...req.query, apiKey: API_KEY_SPOON }
      })
      res.status(200).json(foods.data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async informationFood(req, res, next) {
    try {
      const { id } = req.params
      const foods = await axios.get(`${HOST_SPOON}/recipes/${id}/information`, {
        params: { includeNutrition: false, apiKey: API_KEY_SPOON }
      })
      res.status(200).json(foods.data)
    } catch (error) {
      next(error)
    }
  }

  static async findByIngredients(req, res, next) {
    try {
      const foods = await axios.get(`${HOST_SPOON}/recipes/findByIngredients`, {
        params: { ...req.query, apiKey: API_KEY_SPOON }
      })
      
      res.status(200).json(foods.data)
    } catch (error) {
      next(error)
    }
  }

  static async ingredients(req, res, next) {
    try {
      const foods = await axios.get(`${HOST_SPOON}/food/ingredients/search`, {
        params: { ...req.query, apiKey: API_KEY_SPOON }
      })
      res.status(200).json(foods.data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = FoodController