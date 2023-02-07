const axios = require("axios");

class Controller {
  static async getExercises(req, res, next) {
    try {
      const { search } = req.query;
      const options = {
        method: "GET",
        url: `https://exercisedb.p.rapidapi.com/exercises`,
        headers: {
          "X-RapidAPI-Key": process.env.RapidAPIKey,
          "X-RapidAPI-Host": process.env.RapidAPIHost,
        },
      };

      const result = await axios(options);
      const output = result.data.slice(0, 100);
      console.log(output.length);
      res.status(200).json({ data: output });
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

  static async getBodyParts(req, res, next) {
    try {
      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        headers: {
          "X-RapidAPI-Key": "2e49e0f5b0msh29f18cffd1cf153p1e2596jsnb0ce53987731",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
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
