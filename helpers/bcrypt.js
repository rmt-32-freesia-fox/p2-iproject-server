const { hashSync, genSaltSync, compareSync } = require('bcryptjs');

const compareHash = (password, hash) => compareSync(password, hash);
const hashPassword = (password) => hashSync(password, genSaltSync(10));

module.exports = { compareHash, hashPassword };
