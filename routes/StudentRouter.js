const StudentController = require("../controller/StudentController");
const { studentAuthentication } = require("../middlewares/authentication");
const { onlyStudentAuthorization } = require("../middlewares/authorization");

const router = require("express").Router();

router.post('/register', StudentController.register)
router.post('/login',StudentController.login)
router.post('/join/:courseId',studentAuthentication,onlyStudentAuthorization,StudentController.join)
router.get('/courses',studentAuthentication,onlyStudentAuthorization,StudentController.courseList)

module.exports = router