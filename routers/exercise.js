const router = require("express").Router();
const exerciseController = require("../controllers/exerciseController");

router.get("/exercise", exerciseController.getExercises);
router.get("/muscle", exerciseController.getTargetMuscle);
router.get("/bodyParts", exerciseController.getBodyParts);

module.exports = router;
