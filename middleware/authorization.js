const { User } = require("../models");

async function authorization(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user) {
      throw { name: "NotFound" };
    }
    if (userId.status == "UnMember") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authorization;
