const { User } = require("../models");
const { decodedToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    let { access_token } = req.headers;

    if (!access_token) {
      // dia harus ngirim token
      throw { name: "UnAuthentication" };
    }
    let payload = decodedToken(access_token);

    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "UnAuthentication" };
    }

    // hanya berlaku 1x request
    req.user = {
      id: user.id,
      role: user.role,
      username: user.username,
      status: user.status,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
