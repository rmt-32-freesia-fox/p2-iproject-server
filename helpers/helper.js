const b = require('bcryptjs')
const j = require('jsonwebtoken')
const secret = 'rahasia'

function hashPassword(password) {
    return b.hashSync(password, 10)
}

function checkPassword(password, hash) {
    return b.hashSync(password, hash)
}

function generateToken(payload) {
    return b.hashSync(payload, secret)
}

function decodeToken(token) {
    return b.hashSync(token, secret)
}

module.exports = { hashPassword, checkPassword, generateToken, decodeToken }