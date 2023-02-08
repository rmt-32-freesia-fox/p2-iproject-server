const { Item, User, Category, Transaction } = require('../models');
const { formatIDR, getPagination, getPagingData } = require('../helpers');
const { Op } = require('sequelize');

class ItemController {
  static async getAllItems(req, res, next) {
    const { page, size, name, CategoryId } = req.query;
    const { limit, offset } = getPagination(page, size);
    let condition;
    if (name && CategoryId) {
      condition = { [Op.and]: [{ name: { [Op.iLike]: `%${name}%` } }, { CategoryId }] };
    } else if (name) {
      condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    } else if (CategoryId) {
      condition = { [Op.and]: [{ CategoryId }, { status: 'Ready' }] };
    } else if (!name && !CategoryId) {
      condition = { status: 'Ready' };
    }
    try {
      const items = await Item.findAndCountAll({
        where: condition,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt'],
            },
          },
          {
            model: Category,
          },
        ],
        order: [['id', 'DESC']],
        limit,
        offset,
      });
      const selectedItems = getPagingData(items, page, limit);
      res.status(200).json(selectedItems);
    } catch (err) {
      next(err);
    }
  }

  static async itemById(req, res, next) {
    try {
      const { id } = req.params;
      const itemById = await Item.findByPk(id, {
        include: [
          {
            model: Category,
          },
          {
            model: User,
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt'],
            },
          },
          {
            model: Transaction,
          },
        ],
      });
      if (!itemById) throw { name: 'ItemNotFound' };
      itemById.price = formatIDR(itemById.price);
      res.status(200).json(itemById);
    } catch (err) {
      next(err);
    }
  }

  static async categories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ItemController;
