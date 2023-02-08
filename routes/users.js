const UserController = require("../controllers/UserController");

const router = require("express").Router();

router.post("/register", UserController.postRegister);
router.post("/login", UserController.postLogin);
router.post("/login-github", UserController.githubLogin);
module.exports = router;
