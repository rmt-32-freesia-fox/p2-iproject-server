const StudentController = require("../controller/StudentController");

const router = require("express").Router();

router.post('/register', StudentController.register)
router.post('/login',StudentController.login)

module.exports = router