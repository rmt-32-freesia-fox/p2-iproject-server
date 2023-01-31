const { forSearch } = require('../controllers/controllerCourse');
const ControllerCourse = require('../controllers/controllerCourse');

const router = require('express').Router();

router.get('/?', ControllerCourse.twelevCourse);
router.get('/search?', ControllerCourse.forSearch);
module.exports = router;
