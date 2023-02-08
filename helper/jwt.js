const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

function createToken(payload) {
  //? membuat token
  return jwt.sign(payload, secret);
}

const verifyToken = (token) => jwt.verify(token, secret); //? verify token

module.exports = {
  createToken,
  verifyToken,
};
