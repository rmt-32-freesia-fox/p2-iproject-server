const { checkPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {Student, Class,Course, Material} = require('../models')
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

            res.status(200).json({ access_token: signToken({ id: user.id, email:user.email}) })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    static async join(req,res,next){
        const {courseId} = req.params
        const {id} = req.user
        try {
            const result = await Class.create({
                StudentId:id,
                CourseId:courseId,
                status:"unwatched"
            })
            res.status(200).json(result)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async courseList(req,res,next){
        const {id} = req.user
        try {
            const result = await Class.findAll({
                where:{
                    StudentId:id
                },
                include:{
                    model:Course,
                    key:'id',
                    include:{
                        model:Material,
                        key:'id'
                    }
                }
            })
            res.status(200).json(result)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}