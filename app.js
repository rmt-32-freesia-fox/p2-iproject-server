if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); 
}

const cors = require("cors")
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const port = process.env.PORT || 2500;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("./routes"));

app.use(errorHandler)

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});