var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dimasardiyanto19@gmail.com',
    pass: 'dgppftingfwlsadl',
  },
});

const sendMail = (user, item) => {
  var mailOptions = {
    from: 'easyrent@rent.com',
    to: user.dataValues.email,
    subject: 'Good news!',
    html: `
      <h1 style="text-align:center; font-wight:bold;"> EASY RENT </h1>
      Hallo, ${user.name}.
      <br>
      Yey!, someone has rent your ${item.name} in easy rent,
      <img scr="${item.imageUrl}"> 
      check it out!
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    console.log(user);
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendMail;
