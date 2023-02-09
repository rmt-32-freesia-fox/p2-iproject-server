const ControllerApi = require('../controllers/controllerApi');
const ControllerCourse = require('../controllers/controllerCourse');
const ControllerUsers = require('../controllers/controllerusers');
const authentication = require('../middlewares/authentication');
const routerCourse = require('./course');
const routerMyCourse = require('./mycourse');
const router = require('express').Router();

router.post('/register', ControllerUsers.registerUser);
router.post('/login', ControllerUsers.loginUser);
router.get('/popcourse', ControllerCourse.twelevCourse);
router.post('/googlesign', ControllerUsers.forGoogleLogin);
router.post('/github', ControllerUsers.githubLogin);
router.post('/resetpassword', ControllerUsers.forToken);
router.post('/newpassword', ControllerUsers.forReset);

router.use(authentication);
router.get('/motivation', ControllerApi.motivation);
router.use('/courses', routerCourse);
router.use('/mycourses', routerMyCourse);

module.exports = router;
