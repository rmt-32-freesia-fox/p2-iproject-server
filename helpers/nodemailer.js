const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gymster.official1@gmail.com",
    pass: process.env.PASSWORD_EMAIL,
  },
});

function confirmationRegistered(payload, content, subject) {
  const mailOptions = {
    from: payload.email,
    to: "gymster.official1@gmail.com",
    subject: subject,
    text: content,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Success sent email + ${info.response}`);
    }
  });
}

function confirmationSubscribe(payload, content, subject) {
  const mailOptions = {
    from: "gymster.official1@gmail.com",
    to: payload.email,
    subject: subject,
    text: content,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Success sent email + ${info.response}`);
    }
  });
}

module.exports = {
  confirmationRegistered,
  confirmationSubscribe,
};
