const router = require('express').Router()
const CourseRouter = require('./CourseRouter')
const StudentRouter = require('./StudentRouter')
const TeacherRouter = require('./TeacherRouter')
router.use('/students',StudentRouter)
router.use('/teachers',TeacherRouter)
router.use('/courses',CourseRouter)
module.exports = router