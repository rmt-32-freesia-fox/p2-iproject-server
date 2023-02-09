if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}


const midtransClient = require('midtrans-client');
const { User } = require('../models')

class MidtransController {
  static async generateTokenMids(req, res, next) {
    try {
      const { id } = req.user
      const { price } = req.body

      const user = await User.findByPk(id)

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.API_KEY_MIDS
      });

      let parameter = {
        transaction_details: {
          "order_id": "TRANSACTION" + new Date().getUTCMilliseconds(),
          "gross_amount": +price
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

      const token = await snap.createTransaction(parameter)
      res.status(201).json(token)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = MidtransController