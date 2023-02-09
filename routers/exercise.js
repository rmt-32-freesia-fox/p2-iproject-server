const router = require("express").Router();
const exerciseController = require("../controllers/exerciseController");
const authentication = require("../middleware/authentication");

// third api
router.get("/muscle", exerciseController.getTargetMuscle);

// rest api
router.get("/exercise", exerciseController.getExercises);
router.get("/myexercise", authentication, exerciseController.getMyExercise);
router.post("/myexercise/:exerciseId", authentication, exerciseController.addMyExercise);
router.delete("/myexercise/:id", authentication, exerciseController.deleteMyExercise);

module.exports = router;
