const jwt = require('jsonwebtoken')
const secret = 'santuy'
module.exports = {
    signToken(payload){
        return jwt.sign(payload, secret)
    },
    decodeToken(token){
        return jwt.verify(token,secret)
    }
}