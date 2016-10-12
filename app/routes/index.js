var express = require('express');
var router = express.Router();

// using SendGrid's Node.js Library - https://github.com/sendgrid/sendgrid-nodejs
var sg_username = "user";
var sg_password = "password;";
var sendgrid = require("sendgrid")(sg_username, sg_password, {
    api: 'smtp'
});



/* GET home page. */
router.get('/', function(req, res) {
    res.send('public/index.html');
});


router.post('/form', function(req, res) {
    console.log("Form content", req.body);
    var form = req.body.form;

    var subject = "Espero que lo pasárais bien! Muchísimas gracias por venir!";
    var message = "Vaya fiestón nos pegamos ehh!" ;
    var answer = "Vaya fiestón nos pegamos ehh!"
	// res.status(200).send(answer);
    try {
        sendgrid.send({
            text: message,
            from: "xocru84@gmail.com",
            to: [form.contact],
            bcc: ["xocru84@gmail.com", "wyzahh@gmail.com"],
            subject: subject,
            html: message
        }, function(error, info) {
            if (error) {
                console.log(error);
                res.status(200).send(answer);
            } else {
                res.status(200).send(answer);
                console.log('Message sent: ' + info.response);
            }
        });
    } catch (e) {
        console.log(e);
    }

});

module.exports = router;
