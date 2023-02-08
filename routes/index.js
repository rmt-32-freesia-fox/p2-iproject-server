const router = require("express").Router();
const userRouter = require("./users");
const auctionRouter = require("./auctions");

router.use("/users", userRouter);
router.use("/auctions", auctionRouter);

module.exports = router;
