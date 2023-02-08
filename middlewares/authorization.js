const { decodeToken } = require('../helpers/jwt')
const { Student, Teacher } = require('../models')

async function onlyTeacherAuthorization(req, res, next) {
    try {
        const courseId = req.params.id
        const userId = req.user.id
        const role = req.user.role
        let course;
        if (courseId) {
            course = await Course.findByPk(courseId)
            if (!course) {
                throw {
                    name: "NotFound"
                }
            }
            if (userId !== course.TeacherId) {
                throw {
                    name: "Forbidden"
                }
            }
        }
        if (role !== "teacher") {
            throw {
                name: "Forbidden"
            }
        }

        next()
    } catch (err) {
        console.log('========== AUTHORIZATION ERROR')
        console.log(err)
        next(err)
    }
}
async function onlyStudentAuthorization(req, res, next) {
    try {
        const courseId = req.params.id
        const userId = req.user.id
        const role = req.user.role
        let course;
        if (courseId) {
            course = await Course.findByPk(courseId)
            if (!course) {
                throw {
                    name: "NotFound"
                }
            }
        }
        console.log(role, '====================')
        if (role !== "student") {
            throw {
                name: "Forbidden"
            }
        }

        next()
    } catch (err) {
        console.log('========== AUTHORIZATION ERROR')
        console.log(err)
        next(err)
    }
}

module.exports = { onlyTeacherAuthorization,onlyStudentAuthorization }