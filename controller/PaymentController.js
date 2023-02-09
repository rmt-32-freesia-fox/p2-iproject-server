const midtransClient = require('midtrans-client');
// Create Snap API instance
module.exports = class PaymentController {
    static async midtransSnap(req, res, next) {
        try {
            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: 'SB-Mid-server-3YDbAA7l-G9SsR_0J_9sPcUl',
                clientKey: 'SB-Mid-client-jG7OrBD_MU0RVVoL'
            });
            const { order_id, gross_amount } = req.body
            let parameter = {
                transaction_details: {
                    order_id,
                    gross_amount
                }, credit_card: {
                    secure: true
                }
            };


            // snap.createTransaction(parameter)
            //     .then((transaction) => {
            //         // transaction token
            //         let transactionToken = transaction.token;
            //         console.log('transactionToken:', transactionToken);
            //         res.send(transactionToken)
            //     })

            // alternative way to create transactionToken
            snap.createTransactionToken(parameter)
                .then((transactionToken) => {
                    res.status(200).json(transactionToken);
                })
        } catch (err) {
            res.send(err)
        }
    }
}