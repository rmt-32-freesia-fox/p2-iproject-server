const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/customer');
const ItemController = require('../controllers/item');
const TransactionController = require('../controllers/transaction');

router.post('/register', CustomerController.register);
router.post('/login', CustomerController.login);
router.post('/google-sign-in', CustomerController.googleSignIn);

router.get('/items', ItemController.getAllItems);
router.get('/items/:id', ItemController.itemById);
router.get('/categories', ItemController.categories);

const { authentication } = require('../middlewares/authentication');

router.use(authentication);
router.post('/addCart/:itemId', TransactionController.addCart);
router.get('/carts', TransactionController.getAllcarts);
router.get('/carts/:cartId', TransactionController.cartById);
router.delete('/carts/delete/:cartId', TransactionController.deleteCart);
router.get('/carts/rent/:transactionId', TransactionController.rent);
router.get('/histories', TransactionController.histories);

module.exports = router;
