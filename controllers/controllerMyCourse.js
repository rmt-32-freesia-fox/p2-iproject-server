const { default: axios } = require('axios');
const { MyCourse } = require('../models');
class ControllerMyCourse {
  static async addFavorite(req, res, next) {
    try {
      const { idCourse, imgUrl, description, title, channelTitle, publishedAt } = req.query;
      const { id } = req.user;
      const addFavorite = await MyCourse.create({ idCourse, UserId: id, imgUrl, description, title, channelTitle, publishedAt });
      res.status(201).json({ message: 'success add to list', id: addFavorite.id, UserId: addFavorite.UserId, idCourse: addFavorite.idCourse });
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
  static async forVideo(req, res, next) {
    try {
      const { id } = req.params;
      const dataId = await MyCourse.findByPk(id);
      res.status(200).json({ message: 'thanks for watching', dataLink: `https://www.youtube.com/embed/${dataId.idCourse}`, title: dataId.title });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ControllerMyCourse;
