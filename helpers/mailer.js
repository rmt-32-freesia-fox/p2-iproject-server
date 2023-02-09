const nodemailer = require('nodemailer');
const mailer = (mailto) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // use SSL
    port: 25,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup e-mail data
  var mailOptions = {
    from: process.env.MY_EMAIL, // sender address (who sends)
    to: mailto, // list of receivers (who receives)
    subject: 'Hello', // Subject line
    text: 'Hello Friends ', // plaintext body
    html: '<b>Hello  </b><br> This is the first email sent From mCourse', // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    console.log('Message sent: ' + info.response);
  });
};

const mailercode = (mailto, code) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // use SSL
    port: 25,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup e-mail data
  var mailOptions = {
    from: process.env.MY_EMAIL, // sender address (who sends)
    to: mailto, // list of receivers (who receives)
    subject: 'Hello', // Subject line
    text: 'Hello Friends ', // plaintext body
    html: `<b>Hello  </b><br> This token ${code} for reset password in mCourse account`, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    console.log('Message sent: ' + info.response);
  });
};

module.exports = { mailer, mailercode };
