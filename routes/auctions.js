const AuctionController = require("../controllers/AuctionController");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", AuctionController.getAuction);
router.use(authentication);
router.get("/myauctions", AuctionController.getMyAuction);
router.get("/winner/:id", AuctionController.getWinner);
router.get("/itemslist", AuctionController.getItem);
router.post(
  "/newauction",
  upload.array("images"),
  AuctionController.postAuction
);
router.get("/recentauction", AuctionController.getRecentAuction);
router.get("/:id", AuctionController.getAuctionById);

module.exports = router;
