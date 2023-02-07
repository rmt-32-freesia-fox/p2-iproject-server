require('dotenv').config()

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
      next(error)
    }
  }
}

module.exports = FoodController