const b = require("bcrypt")
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET


const generatetoken = (payload) => {
    return jwt.sign(payload, secret)
}

const decodeToken = (token) => {
    return jwt.verify(token, secret)
}
const hashPassword = (password) => {
    return b.hashSync(password, 12)
}

const checkPass = (password, hash) => {
    return b.compareSync(password, hash)
}

const generateRandomId = () => {
    let randomKey = [1, 'a', 'b', 5, 6, 'c', 'd', '/', '1', '[]', 456, `asdf123`]
    let randomIndex = Math.floor(Math.random() * randomKey.length)
    return b.hashSync(`${randomKey[randomIndex] + Math.random() + randomKey[randomIndex]}`, 8).slice(-24)
}


module.exports = { hashPassword, checkPass, decodeToken, generatetoken, generateRandomId }

console.log(generateRandomId());