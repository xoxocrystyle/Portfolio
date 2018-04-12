const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const port = 3000;

let smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "xoxocrystyle@gmail.com",
        pass: "Cn4v4rr0"
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/send', (req, res) => {
   var mailOptions={
       to: req.query.to,
       subject: req.query.subject,
       text: req.query.text
   }
   console.log(mailOptions);
   smtpTransport.sendMail(mailOptions, (err, response) => {
       if(err){
           console.log(err);
           response.end("There was an error sending your message.");
       } else {
           console.log("Message sent: " + res.message);
           response.end("Your message was sent! Thank you.")
       }
   });
});

app.listen(port, () => {
    console.log('Listening on port: ', port);
})