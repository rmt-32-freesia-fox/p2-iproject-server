const { default: axios } = require('axios');
const { MyCourse } = require('../models');
class ControllerMyCourse {
  static async addFavorite(req, res, next) {
    try {
      const { idCourse, imgUrl, description } = req.body;
      const { id } = req.user;
      const addCourse = await MyCourse.create({ idCourse, UserId: id, imgUrl, description });
      res.status(200).json({ id: addCourse.id, idCourse: addCourse.idCourse, isSubscribe: addCourse.isSubscribe, imgUrl: addCourse.imgUrl });
    } catch (error) {
      next(error);
    }
  }
  static async removeFavorite(req, res, next) {
    try {
      const { id } = req.params;
      await MyCourse.destroy({ where: { id } });
      res.status(200).json({ message: 'success remove from favorite' });
    } catch (error) {
      next(error);
    }
  }
  static async getMyCourse(req, res, next) {
    try {
      const { id } = req.user;
      const dataMyCourse = await MyCourse.findAll({ where: { UserId: id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
      res.status(200).json(dataMyCourse);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ControllerMyCourse;
