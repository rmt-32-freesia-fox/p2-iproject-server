const bcrypt = require('bcryptjs');

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  hashPassword,
  comparePassword,
};
