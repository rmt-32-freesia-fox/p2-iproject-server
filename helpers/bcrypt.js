const bcrypt = require('bcryptjs')

const encryptPassword = (password)=>{
    return bcrypt.hashSync(password)
}

const comparePassword = (password,hash) =>{
    return bcrypt.compareSync(password,hash)
}

module.exports = {
    encryptPassword,
    comparePassword
}