const jwt = require("jsonwebtoken");
const secret = "ArtinyaApaBangMessi";

module.exports = {
  signToken: (payload) => {
    return jwt.sign(payload, secret);
  },
  verifyToken: (token) => {
    return jwt.verify(token, secret);
  },
};
