const StudentController = require("../controller/StudentController");
const { studentAuthentication } = require("../middlewares/authentication");

const router = require("express").Router();

router.post('/register', StudentController.register)
router.post('/login',StudentController.login)
router.post('/join',studentAuthentication,StudentController.join)

module.exports = router