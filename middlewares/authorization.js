const { Item } = require('../models');

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itemById = await Item.findByPk(id);
    if (!itemById) {
      throw { name: 'ItemNotFound' };
    }

    if (req.user.role != 'Renter') {
      if (itemById.UserId !== req.user.idUser) {
        throw { name: 'Forbidden' };
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authorization };
