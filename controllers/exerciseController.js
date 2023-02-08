const axios = require("axios");
const { User, Exercise, MyExercise } = require("../models");
const { Op } = require("sequelize");

class Controller {
  static async getExercises(req, res, next) {
    try {
      const { page, size, search, name } = req.query;

      let result;
      if (search && name) {
        result = { [Op.and]: [{ name: { [Op.iLike]: `%${search}%` } }, { name }] };
      }
      if (search) {
        result = { [Op.and]: [{ name: { [Op.iLike]: `%${search}%` } }] };
      }
      if (name) {
        result = { [Op.and]: [{ name }] };
      }
      if (!search && !name) {
        result;
      }
      const getPage = (page, size) => {
        const limit = size ? size + 1 : 6;
        const offset = page ? page * limit : 0;

        return { limit, offset };
      };
      const { limit, offset } = getPage(page, size);

      const getDataPerPage = (data, page, limit) => {
        const { count: countPage, rows: Exercise } = data;
        const currentPage = page ? page + 1 : 0;
        const totalPages = Math.ceil(countPage / limit);
        return { countPage, Exercise, totalPages, currentPage };
      };

      const dataExercises = await Exercise.findAndCountAll({ where: result, limit, offset });
      const response = getDataPerPage(dataExercises, page, limit);
      res.status(200).json({ response });
    } catch (error) {
      next(error);
    }
  }

  static async getTargetMuscle(req, res, next) {
    try {
      const options = {
        method: "GET",
        url: "https://wger.de/api/v2/equipment/",
      };
      const result = await axios(options);

      res.status(200).json(result.data.results);
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

  static async getMyExercise(req, res, next) {
    try {
      const UserId = req.user.id;
      const myexercise = await MyExercise.findAll({ where: { UserId }, include: Exercise });
      res.status(200).json(myexercise);
    } catch (error) {
      next(error);
    }
  }

  static async addMyExercise(req, res, next) {
    try {
      const { exerciseId } = req.params;
      const { id } = req.user;

      const exercise = await Exercise.findByPk(exerciseId);
      if (!exercise) throw { name: "NotFound" };

      const myexercise = await MyExercise.findOne({ where: { UserId: id, ExerciseId: exerciseId } });
      if (myexercise) throw { name: "Forbidden" };

      const myexer = await MyExercise.create({ UserId: id, ExerciseId: exerciseId });
      res.status(201).json(myexer);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
