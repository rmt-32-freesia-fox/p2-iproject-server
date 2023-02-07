const axios = require("axios");

class Controller {
  static async getExercises(req, res, next) {
    try {
      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises",
        headers: {
          "X-RapidAPI-Key": process.env.RapidAPIKey,
          "X-RapidAPI-Host": process.env.RapidAPIHost,
        },
      };
      const result = await axios(options);
      res.status(200).json({ data: result.data });
    } catch (error) {
      next(error);
    }
  }

  static async getTargetMuscle(req, res, next) {
    try {
      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises/targetList",
        headers: {
          "X-RapidAPI-Key": process.env.RapidAPIKey,
          "X-RapidAPI-Host": process.env.RapidAPIHost,
        },
      };
      const result = await axios(options);
      res.status(200).json({ data: result.data });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
