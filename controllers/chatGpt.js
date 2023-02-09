if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

const { Event, Subscribe, User } = require('../models')


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



class chatController {
  static async chatGpt(req, res, next) {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Recipe and instruction make ${req.body.food} :`,
        temperature: 0.3,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      }); 

      res.status(200).json(response.data.choices[0].text)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = chatController