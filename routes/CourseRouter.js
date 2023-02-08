const CourseController = require("../controller/CourseController");
const { teacherAuthentication } = require("../middlewares/authentication");
const { onlyTeacherAuthorization } = require("../middlewares/authorization");

const router = require("express").Router();

router.get('/', CourseController.getCourse)
router.post('/',teacherAuthentication,onlyTeacherAuthorization, CourseController.createCourse)
router.post('/:courseId',teacherAuthentication,onlyTeacherAuthorization, CourseController.createMaterialCourse)
router.get('/:courseId',CourseController.getCourseByPk)
router.delete('/:courseId',teacherAuthentication,onlyTeacherAuthorization, CourseController.deleteCourse)

module.exports = router