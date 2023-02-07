module.exports = class TeacherController {
    static async register(req,res,next){
        const { email, password } = req.body
        try {
            const user = await User.create({
                email,
                password
            })
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ message: "Email must be unique" })
            } else {
                next(err)
            }
        }
    }
    static async login(req,res,next){
        try {
            
        } catch (err) {
            
        }
    }
}