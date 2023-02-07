const b= require('bcrypt')

module.exports = {
    hashPassword(password){
        return b.hashSync(password, 12)
    },
    checkPassword(password,hash){
        return b.compareSync(password, hash)
    }
}