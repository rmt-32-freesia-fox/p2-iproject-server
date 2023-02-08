const nodemailer = require('nodemailer')

function sendEmail({ to, subject, html }) {
    console.log('Tesr jalan');
    const transposter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'office.berliterasi@gmail.com',
            pass: process.env.Gmail_Pass
        }
    })

    const mailOptions = {
        from: 'office.berliterasi@gmail.com',
        to: to || 'adityakasyidi09@gmail.com',
        subject: subject || 'Greetings from Berliterasi!',
        html: html ||
            `<p>
                Hi! our beloved user, this is a message from <strong> Official Berliterasi. </strong> We want to say thank you for <strong> joining (register/sign up) to our platform. </strong>
    
                As an expression of gratitude, we would like to give a discount for your 2nd purchase with 20% discount by using this following <strong> code: 21*ak-M1. </strong>
    
                Once again, thank you!
            </p>`
    }

    console.log('Test tunggu email');

    transposter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:' + info.response);
        }
    })
}


module.exports = { sendEmail }