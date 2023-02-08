const ControllerMyCourse = require('../controllers/controllerMyCourse');
const { onlySubs, authorization } = require('../middlewares/authorization');

const router = require('express').Router();

router.post('/', ControllerMyCourse.addFavorite);
router.get('/', ControllerMyCourse.getMyCourse);
router.delete('/:id', authorization, ControllerMyCourse.removeFavorite);
router.get('/:id', onlySubs, ControllerMyCourse.forVideo);
router.post('/payment/:id', ControllerMyCourse.payment);
router.patch('/:id', authorization, ControllerMyCourse.patchSubsribe);
module.exports = router;
