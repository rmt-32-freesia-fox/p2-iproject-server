if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const { createServer } = require("http");
var cron = require("node-cron");
const app = express();
const port = 3000;
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const AuctionController = require("./controllers/AuctionController");
const { verifyToken } = require("./helpers/jwt");
const httpServer = createServer(app);
const { Auction, History } = require("./models");

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://hlr-auction.web.app",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("A user is connected", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("join", (payload) => {
    const { access_token, roomId } = payload;
    const { id, name } = verifyToken(access_token);

    socket.join(roomId);
    io.to(roomId).emit("connectionSuccess", {
      message: `${name} Join This Room`,
    });
  });
  socket.on("bid", async (payload) => {
    const { access_token, roomId, bid } = payload;
    const { id, name } = verifyToken(access_token);
    const auction = await Auction.findByPk(roomId);
    const history = await History.findOne({
      where: {
        AuctionId: roomId,
      },
    });
    if (auction.status !== "available") {
      socket.emit("bidFailed", { message: "Bidding Session is Closed" });
    } else if (history.bid >= bid) {
      socket.emit("bidFailed", { message: "Bid cannot less than recent bid" });
    } else if ((bid - auction.startPrice) % auction.multiple !== 0) {
      socket.emit("bidFailed", {
        message: `Bid must be multiple of ${auction.multiple}`,
      });
    } else {
      await history.update({ bid: bid, UserId: id });
      io.to(roomId).emit("bidSuccess", {
        message: `${name} has bidding to ${bid}`,
        bid,
        name,
      });
    }
  });
});

cron.schedule("0 21 * * *", AuctionController.closeBid);

httpServer.listen(port, () => {
  console.log("Flying on port", port);
});
