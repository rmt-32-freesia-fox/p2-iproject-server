if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// console.log(process.env.JWT_SECRET);

const express = require('express');
const app = express();
// const port = 3000;
const port = process.env.PORT || 3000;
const cors = require('cors');

const errorHandler = require('./middlewares/errorHandler');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const router = require('./routes');
app.use('/', router);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
