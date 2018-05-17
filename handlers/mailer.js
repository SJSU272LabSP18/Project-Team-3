const mailer = require('nodemailer');
const htmlToText = require('html-to-text');
const juice = require('juice');



var transporter = mailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
});

exports.send = async(options) => {


// send mail with defined transport object
transporter.sendMail(options, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    
});


}