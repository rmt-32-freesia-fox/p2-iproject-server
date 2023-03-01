if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routers");
const errHandler = require("./middleware/errHandler");

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is Live",
    status: "OK",
  });
});
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
