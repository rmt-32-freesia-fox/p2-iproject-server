const jwt = require('jsonwebtoken')
const key = process.env.JWT_SECRET


const encodeToken =(payload)=>{
    return jwt.sign(payload,key)
}
const decodeToken =(token)=>{
    return jwt.verify(token,key)
}

module.exports = {
    encodeToken,
    decodeToken,
}
