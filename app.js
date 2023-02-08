if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
var cron = require("node-cron");
const app = express();
const port = 3000;
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const AuctionController = require("./controllers/AuctionController");
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
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
    socket.join(roomId);
    console.log(payload);
    io.to(roomId).emit("hello", { id: access_token, message: "hello unWorld" });
  });
  socket.on("kirimPesan", (payload) => {
    const { input, roomId } = payload;
    console.log(payload);
    io.to(roomId).emit("teriak", { message: input });
  });
  // ! HANDLE BID >> UPDATE DATABASE WINNER
});

httpServer.listen(port, () => {
  console.log("listening on port", port);
});
