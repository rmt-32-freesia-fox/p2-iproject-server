const router = require("express").Router();
const userController = require("../controllers/userController");
const authentication = require("../middleware/authentication");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/google-sign-in", userController.loginWithGoogle);

// Midtrans Payment
router.post("/generate-midtrans-token", authentication, userController.midtransToken);

router.patch("/subscribe", authentication, userController.editStatus);

module.exports = router;
