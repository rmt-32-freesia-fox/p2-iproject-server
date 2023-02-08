const express = require('express');
const router = express.Router();

// const Controller = require('../controllers');

const routerCustomers = require('./customers');
const routerItems = require('./items');
const routerTransactions = require('./transactions');

router.use('/customers', routerCustomers);
router.use('/items', routerItems);
router.use('/transactions', routerTransactions);

module.exports = router;
