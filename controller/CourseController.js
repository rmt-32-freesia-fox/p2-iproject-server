const { Course, Material } = require('../models')
module.exports = class CourseController {
    static async getCourse(req, res, next) {
        try {
            const course = await Course.findAll({
                attributes: [
                    'name',
                    'description'
                ],
                include: {
                    model: Material,
                    key: 'id',
                    attributes: [
                        'name',
                        'videoId',
                        'docsId',
                    ]
                }
            })

            res.status(200).json(course)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    static async createCourse(req, res, next) {
        const { id } = req.user
        const { name, description } = req.body
        try {
            const course = await Course.create({
                name, description, TeacherId: id
            })
            res.status(201).json(course)
        } catch (err) {
            console.log('===========')
            console.log(err)
            next(err)
        }
    }
    static async createMaterialCourse(req, res, next) {
        const {courseId} = req.params
        const { name, videoId, docsId } = req.body
        try {
            const material = await Material.create({
                name, videoId,docsId,CourseId:courseId
            })
            res.status(201).json(course)
        } catch (err) {
            console.log('===========')
            console.log(err)
            next(err)
        }
    }
    static async getCourseByPk(req, res, next) {
        try {

        } catch (err) {

        }
    }
    static async deleteCourse(req, res, next) {
        try {

        } catch (err) {

        }
    }
}