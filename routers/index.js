const ControllerUsers = require('../controllers/controllerusers');
const authentication = require('../middlewares/authentication');
const routerCourse = require('./course');
const routerMyCourse = require('./mycourse');
const router = require('express').Router();

router.post('/register', ControllerUsers.registerUser);
router.post('/login', ControllerUsers.loginUser);
router.use(authentication);
router.use('/courses', routerCourse);
router.use('/mycourses', routerMyCourse);

module.exports = router;
