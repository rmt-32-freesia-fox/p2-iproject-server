const ControllerApi = require('../controllers/controllerApi');
const { forSearch } = require('../controllers/controllerCourse');
const ControllerCourse = require('../controllers/controllerCourse');

const router = require('express').Router();

router.get('/', ControllerCourse.twelevCourse);
router.get('/data?', ControllerCourse.videoById);

module.exports = router;
