const ControllerMyCourse = require('../controllers/controllerMyCourse');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();

router.post('/', ControllerMyCourse.addFavorite);
router.get('/', ControllerMyCourse.getMyCourse);
router.delete('/:id', authorization, ControllerMyCourse.removeFavorite);
module.exports = router;
