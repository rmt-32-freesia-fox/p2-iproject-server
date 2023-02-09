const { User } = require('../models');
const { decodedToken } = require('../helpers/jwt');

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      console.log('tesss');
      throw { name: 'Unauthenticated' };
    } else {
      let payload = decodedToken(access_token);

      let user = await User.findByPk(payload.id);
      if (!user) {
        throw { name: 'Unauthenticated' };
      }

      req.user = {
        idUser: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      next();
    }
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

module.exports = { authentication };
