require('dotenv').config()

const midtransClient = require('midtrans-client');
const { User } = require('../models')

class MidtransController {
  static async generateTokenMids() {
    try {
      const { id } = req.user

      const user = await User.findByPk(id)

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.API_KEY_MIDS
      });

      let parameter = {
        transaction_details: {
          "order_id": "ORDER_" + Math.floor(100000 + Math.random() + 900000),
          "gross_amount": 10000
        },
        "credit_card": {
          "secure": true
        },
        "customer_details": {
          "name": user.name,
          "email": user.email,
          "phone": user.phoneNumber
        }
      };

      const res = await snap.createTransaction(parameter)
      res.status(201).json(res)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MidtransController