const router = require("express").Router();
const userRouter = require("./user");
const exerciseRouter = require("./exercise");

router.use(userRouter);
router.use(exerciseRouter);

module.exports = router;
