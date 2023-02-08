const router = require("express").Router();
const userController = require("../controllers/userController");
const authentication = require("../middleware/authentication");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/google-sign-in", userController.loginWithGoogle);

// Midtrans Payment
router.use(authentication);
router.post("/generate-midtrans-token", userController.midtransToken);

router.patch("/subscribe", userController.editStatus);

module.exports = router;
