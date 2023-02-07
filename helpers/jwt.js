const jwt = require('jsonwebtoken')
const secret = 'rahasia'

const encodedToken = (payLoad) => {
    return jwt.sign(payLoad, secret)
}
const decodedToken = (token) => {
    return jwt.verify(token, secret)
}

module.exports = { encodedToken, decodedToken }