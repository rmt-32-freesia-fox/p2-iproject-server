const { formatIDR, countTotalPrice } = require('../helpers');
const sendMail = require('../helpers/nodemailer');
const { Transaction, Item, User, Category } = require('../models');

const midtransClient = require('midtrans-client');

class TransactionController {
  static async addCart(req, res, next) {
    const { quantity } = req.body;
    const { itemId } = req.params;
    const UserId = req.user.idUser;
    try {
      if (quantity <= 0) {
        throw { name: 'QuantityError' };
      }
      const addedItem = await Item.findByPk(itemId);
      if (addedItem.quantity < quantity) {
        throw { name: 'NotEnoughItem' };
      } else {
        const subtotal = addedItem.dataValues.price * quantity;
        const transaction = await Transaction.create({
          quantity,
          ItemId: addedItem.id,
          UserId,
          status: 'cart',
          subtotal,
        });
        res.status(201).json(transaction);
      }
    } catch (err) {
      next(err);
    }
  }

  static async getAllcarts(req, res, next) {
    const UserId = req.user.idUser;
    try {
      const carts = await Transaction.findAll({
        attributes: ['id', 'quantity', 'subtotal'],
        include: [
          {
            model: Item,
            include: {
              model: Category,
            },
          },
          {
            model: User,
          },
        ],
        where: {
          UserId,
          status: 'cart',
        },
        order: [['id', 'DESC']],
      });
      res.status(200).json(carts);
    } catch (err) {
      next(err);
    }
  }

  static async cartById(req, res, next) {
    const { cartId } = req.params;
    try {
      const cartById = await Transaction.findByPk(cartId, {
        include: {
          model: Item,
          include: [
            {
              model: User,
              attributes: { exclude: ['password'] },
            },
            {
              model: Category,
            },
          ],
        },
      });
      cartById.Item.price = formatIDR(cartById.Item.price);
      cartById.subtotal = formatIDR(cartById.subtotal);
      res.status(200).json(cartById);
    } catch (err) {
      next(err);
    }
  }

  static async deleteCart(req, res, next) {
    const { cartId } = req.params;
    try {
      const deletedCart = await Transaction.destroy({ where: { id: cartId } });
      res.status(200).json({ message: 'Sussess delete' });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async rent(req, res, next) {
    const { transactionId } = req.params;
    let checkout;
    let seller = {};
    let item = {};
    try {
      const transactionById = await Transaction.findByPk(transactionId, {
        include: {
          model: Item,
          include: {
            model: User,
            attributes: { exclude: ['password'] },
          },
        },
      });

      if (!transactionById) {
        throw { name: 'TranscationNotFound' };
      }
      checkout = transactionById;
      if (checkout.status == 'checkout') {
        throw { name: 'AlreadyCheckout' };
      }

      let serverKey = process.env.serverKey;
      let clientKey = process.env.clientKey;
      let total = transactionById.subtotal;
      const user = await User.findByPk(transactionById.UserId);
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey,
        clientKey,
      });
      let parameter = {
        transaction_details: {
          order_id: 'TRANSACTIONS' + Math.floor(100000 + Math.random() * 900000),
          gross_amount: total,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          name: user.name,
          email: user.email,
        },
      };
      const midtransToken = await snap.createTransaction(parameter);
      const statusItem = await checkout.update({ status: 'checkout' });
      const stockItemAfterCheckout = await checkout.Item.decrement({ quantity: checkout.quantity });
      item = checkout.Item;
      seller = checkout.Item.User;
      sendMail(seller, item);

      res.status(200).json({
        midtransToken,
        checkout,
      });
    } catch (err) {
      next(err);
    }
  }

  static async histories(req, res, next) {
    const { idUser } = req.user;
    try {
      const transaction = await Transaction.findAll({
        attributes: ['id', 'quantity', 'subtotal'],
        include: Item,
        where: {
          UserId: idUser,
          status: 'checkout',
        },
      });
      let totalPrice = formatIDR(countTotalPrice(transaction));
      transaction.forEach((x) => {
        x.subtotal = formatIDR(x.subtotal);
        x.Item.price = formatIDR(x.Item.price);
      });
      res.status(200).json({ transaction, totalPrice });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TransactionController;
