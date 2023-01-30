const bcrypt = require('bcryptjs');

const encryptPass = (dataPass) => bcrypt.hashSync(dataPass, 10);
const descryptPass = (dataPass, hashpass) => bcrypt.compareSync(dataPass, hashpass);

module.exports = { encryptPass, descryptPass };
