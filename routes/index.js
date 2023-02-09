const router = require('express').Router()
const CourseController = require('../controller/CourseController')
const PaymentController = require('../controller/PaymentController')
const CourseRouter = require('./CourseRouter')
const StudentRouter = require('./StudentRouter')
const TeacherRouter = require('./TeacherRouter')
router.get('/categories', CourseController.getCategories)
router.get('/categories/:id', CourseController.getCategoryByPk)
router.use('/students',StudentRouter)
router.use('/teachers',TeacherRouter)
router.use('/courses',CourseRouter)

router.post('/get-mt-token',PaymentController.midtransSnap)
module.exports = router