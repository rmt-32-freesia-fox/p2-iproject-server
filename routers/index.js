const express = require('express');
const authentication = require('../middleware/authentication');
const routerDota = require('./dota2');
const routerUser = require('./user');
const router = express.Router();
router.use(routerUser);

router.use(authentication);

router.use(routerDota);

module.exports = router;
