const { decodeToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
  
  
  try {
    const { access_token } = req.headers;
    // console.log(access_token);

    if (!access_token) {
      throw { name: 'invalid_token' };
    }

    const payLoad = decodeToken(access_token);
    const findUser = await User.findByPk(payLoad.id);
    
    if (!findUser) {
      throw { name: 'invalid_token' };
    }

    req.user = {
      id: findUser.id,
      role: findUser.role,
      email: findUser.email
    };
    next();
  } catch (error) {
    next(error);
   
  }
};

module.exports = authentication;