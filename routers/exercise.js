const router = require("express").Router();
const exerciseController = require("../controllers/exerciseController");

// third api
router.get("/muscle", exerciseController.getTargetMuscle);
router.get("/bodyParts", exerciseController.getBodyParts);

// rest api
router.get("/exercise", exerciseController.getExercises);
router.get("/myexercise", exerciseController.getMyExercise);
router.post("/myexercise/:exerciseId", exerciseController.addMyExercise);

module.exports = router;
