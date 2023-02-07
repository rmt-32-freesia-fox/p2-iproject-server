const router = require("express").Router();
const exerciseController = require("../controllers/exerciseController");

router.get("/exercise", exerciseController.getExercises);
router.get("/muscle", exerciseController.getTargetMuscle);

module.exports = router;
