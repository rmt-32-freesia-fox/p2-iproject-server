const b = require('bcryptjs')
const j = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

function hashPassword(password) {
    return b.hashSync(password, 10)
}

function checkPassword(password, hash) {
    return b.compareSync(password, hash)
}

function generateToken(payload) {
    return j.sign(payload, secret)
}

function decodeToken(token) {
    return j.verify(token, secret)
}

module.exports = { hashPassword, checkPassword, generateToken, decodeToken }