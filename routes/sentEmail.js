const routes = require('express').Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
require("dotenv").config();


routes.get('/test', (req, res) => {
  res.status(200).json({ message: 'test!' });
});

routes.post('/Email', (req, res) =>{

    var smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secureConnection: false,
        port: 587,
        requiresAuth: true,
        domains: ["gmail.com", "googlemail.com"],
        auth: {
            user: 'quizappg12.studentpnc@gmail.com',
            pass: process.env.PASSWORD_ADMIN
        }
});  

  var mailOptions = {
    from: 'quizappg12.studentpnc@gmail.com',
    to: req.body.to,
      subject: req.body.subject,
      text: req.body.content
  };

smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error while sending mail: ' + error);
    } else {
        console.log('Message sent: %s', info.messageId);
    }
    smtpTransport.close();
});  

})

module.exports = routes;