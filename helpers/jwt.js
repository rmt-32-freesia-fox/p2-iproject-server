const jwt = require('jsonwebtoken');
const kode = process.env.JWT_CODE;

const encodeToken = (payload) => jwt.sign(payload, kode);
const decodeToken = (token) => jwt.verify(token, kode);

module.exports = { encodeToken, decodeToken };
