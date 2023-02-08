const { sign, verify } = require('jsonwebtoken')
const { JWT_SECRET } = process.env

if (!JWT_SECRET) {
  console.log(`"JWT_SECRET" is required in envoirment`)
  process.exit(1)
}

const signToken = (payload) => sign(payload, JWT_SECRET)
const verifyToken = (token) => verify(token, JWT_SECRET)
const noErrorVerifyToken = (token) => {
  try {
    return verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = { signToken, verifyToken, noErrorVerifyToken }
