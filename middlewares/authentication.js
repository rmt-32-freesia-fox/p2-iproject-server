const { verifyToken } = require("../helpers/jwt");

module.exports = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token;
    if (!access_token) throw { name: "token" };
    const payload = verifyToken(access_token);
    req.user = {
      id: payload.id,
      email: payload.email,
      name: payload.email,
    };
    next();
  } catch (err) {
    next(err);
  }
};
