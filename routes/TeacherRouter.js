const TeacherController = require("../controller/TeacherController");

const router = require("express").Router();

router.post('/register', TeacherController.register)
router.post('/login',TeacherController.login)

module.exports = router