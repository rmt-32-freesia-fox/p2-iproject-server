const nodemailer = require('nodemailer');
const mailer = (mailto) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // use SSL
    port: 25,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.NOIDMAILERS_KEY,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup e-mail data
  var mailOptions = {
    from: process.env.MY_EMAIL, // sender address (who sends)
    to: mailto, // list of receivers (who receives)
    subject: 'Hello My Customer', // Subject line
    text: 'Hello world ', // plaintext body
    html: '<b>Hello world </b><br> Thank You for your visit', // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    console.log('Message sent: ' + info.response);
  });
};

module.exports = mailer;