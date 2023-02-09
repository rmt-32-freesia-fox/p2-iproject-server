const { default: axios } = require('axios');
const { MyCourse } = require('../models');
const midtransClient = require('midtrans-client');

class ControllerMyCourse {
  static async addFavorite(req, res, next) {
    try {
      const { idCourse, imgUrl, description, title, channelTitle, publishedAt } = req.query;
      const { id } = req.user;
      const findId = await MyCourse.findOne({ where: { UserId: id, idCourse } });
      if (findId) throw { name: 'data already' };
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
      const dataMyCourse = await MyCourse.findAll({ where: { UserId: id }, attributes: { exclude: ['createdAt', 'updatedAt'] }, order: [['id', 'DESC']] });
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
  static async payment(req, res, next) {
    try {
      const { id } = req.params;
      const findId = await MyCourse.findByPk(id);
      if (!findId) throw { name: 'not found' };
      if (findId.isSubsribe == true) throw { name: 'already subscribe' };
      const { username, email } = req.user;
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_API,
      });

      let parameter = {
        transaction_details: {
          order_id: `YOUR-${findId.idCourse}-ORDERID-${1000 + Math.floor(Math.random() * 3000)}`,
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: username,
          email: email,
        },
      };

      let midtransToken = await snap.createTransaction(parameter);
      res.status(200).json(midtransToken);
    } catch (error) {
      next(error);
    }
  }
  static async patchSubsribe(req, res, next) {
    try {
      const { id } = req.params;
      const updateStatus = await MyCourse.update({ isSubscribe: true }, { where: { id } });
      res.status(200).json({ message: 'Thanks for Subsribe' });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ControllerMyCourse;
