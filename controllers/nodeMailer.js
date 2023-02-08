const nodemailer = require('nodemailer')

const transposter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'office.berliterasi@gmail.com',
        pass: process.env.Gmail_Pass
    }
})

const mailOptions = {
    from: 'office.berliterasi@gmail.com',
    to: 'adityakasyidi09@gmail.com',
    subject: 'Warmest hi from Berliterasi!',
    html:
        `<p>
            Hi! For our beloved user, this a message from Official Berliterasi. We want to say thank you for buying a book from us.

            As an expression of gratitude, we would like to give a discount for your next purchase of 20% by using the following discount <strong> code: 21*ak-M1 </strong>

            Once again, thank you!
        </p>`
}




module.exports = { transposter, mailOptions }