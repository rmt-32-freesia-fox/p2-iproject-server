const { checkPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {Student} = require('../models')
module.exports = class StudentController {
    static async register(req,res,next){
        const { username,email, password,profileImg } = req.body
        try {
            const user = await Student.create({
                username,
                email,
                password,
                profileImg
            })
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (err) {
            console.log(err)
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ message: "Email must be unique" })
            } else {
                next(err)
            }
        }
    }
    static async login(req,res,next){
        const { email, password } = req.body
        try {
            if (!email) throw { name: 'EmailRequired' }
            if (!password) throw { name: 'PasswordRequired' }
            const user = await Student.findOne({ where: { email } })
            if (!user) throw { name: 'InvalidCredentials' }

            if (!checkPassword(password, user.password)) throw { name: 'InvalidCredentials' }

            res.status(200).json({ access_token: signToken({ id: user.id }) })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    static async join(req,res,next){
        try {
            
        } catch (err) {
            next(err)
        }
    }
}