if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const port = process.env.PORT || 3000;
const routes = require("./routers");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
