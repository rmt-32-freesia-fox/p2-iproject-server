const router = require('express').Router()
const CourseRouter = require('./CourseRouter')
const StudentRouter = require('./StudentRouter')
const TeacherRouter = require('./TeacherRouter')
app.use('/students',StudentRouter)
app.use('/teachers',TeacherRouter)
app.use('/courses',CourseRouter)
module.exports = router