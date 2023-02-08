const { decodeToken } = require('../helpers/jwt')
const {Student, Teacher} = require('../models')

async function studentAuthentication(req,res,next){
    const {access_token} = req.headers
    try {
        if(!access_token) throw {name: 'Unauthenticated'}
        const payload = decodeToken(access_token)
        const user = await Student.findByPk(payload.id)
        if(!user) throw {name: 'Unauthenticated'}
        req.user = {
            id:user.id,
            role:user.role
        }
        next()
    } catch (err) {
        console.log('========== AUTENTICATION ERROR')
        console.log(err)
        next(err)
    }
}
async function teacherAuthentication(req,res,next){
    const {access_token} = req.headers
    try {
        if(!access_token) throw {name: 'Unauthenticated'}
        const payload = decodeToken(access_token)
        const user = await Teacher.findByPk(payload.id)
        
        if(!user) throw {name: 'Unauthenticated'}
        req.user = {
            id:user.id,
            role:user.role
        }
        next()
    } catch (err) {
        console.log('========== AUTENTICATION ERROR')
        console.log(err)
        next(err)
    }
}

module.exports = {studentAuthentication, teacherAuthentication}