const { Course, Material,Category } = require('../models')
module.exports = class CourseController {
    static async getCourse(req, res, next) {
        try {
            const course = await Course.findAll({
                attributes: [
                    'id',
                    'name',
                    'description',
                    'imgUrl'
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
            res.status(201).json(material)
        } catch (err) {
            console.log('=========== createMaterialCourse error')
            console.log(err)
            next(err)
        }
    }
    static async getCourseByPk(req, res, next) {
        const {courseId} = req.params
        try {
            const course = await Course.findOne({
                where:{id:courseId},
                include:{
                    model:Material,
                    key:'id'
                }
            })
            res.status(200).json(course)
        } catch (err) {
            console.log('=========== getCourseByPk error')
            console.log(err)
            next(err)
        }
    }
    static async deleteCourse(req, res, next) {
        const {courseId} = req.params
        try {
            await Course.destroy({where:{id:courseId}})
            res.status(200).json({message:'success to delete'})
        } catch (err) {
            console.log('=========== deletecourse error')
            console.log(err)
            next(err)
        }
    }
    static async deleteMaterial(req, res, next) {
        const {materialId} = req.params
        try {
            await Material.destroy({where:{id:materialId}})
            res.status(200).json({message:'success to delete'})
        } catch (err) {
            console.log('=========== deletematerial error')
            console.log(err)
            next(err)
        }
    }
    static async getCategories(req, res, next) {
        try {
            const categories = await Category.findAll({
                include:{
                    model:Course,
                    key:'id'
                }
            })
            res.status(200).json(categories)
        } catch (err) {
            console.log('=========== get categories error')
            console.log(err)
            next(err)
        }
    }
    static async getCategoryByPk(req, res, next) {
        const {id} = req.params
        try {
            const category = await Category.findOne({
                where:{
                    id
                },
                include:{
                    model:Course,
                    key:'id',
                }
            })
            res.status(200).json(category)
        } catch (err) {
            console.log('=========== get categories error')
            console.log(err)
            next(err)
        }
    }
}