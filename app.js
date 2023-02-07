if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
