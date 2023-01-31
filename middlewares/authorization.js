const { MyCourse } = require('../models');
const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findId = await MyCourse.findByPk(id);
    if (!findId) throw { name: 'not found' };
    if (findId.UserId != req.user.id) throw { name: 'forbidden' };
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authorization;
