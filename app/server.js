var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var dotenv = require('dotenv'); 
var cors = require('cors')
var sgMail = require('@sendgrid/mail');

dotenv.load(); //load environment variables from .env into ENV (process.env).

// var sendgrid_username   = process.env.SENDGRID_USERNAME;
// var sendgrid_password   = process.env.SENDGRID_PASSWORD;
// console.log("SENDGRID_USERNAME: " + sendgrid_username);

//MacBook-Air-Ekaterina:Documents Kate$ . diploma.sh;

// var sendgrid   = require('sendgrid')(sendgrid_username, sendgrid_password);
// var email      = new sendgrid.Email();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var app = express();
app.use(bodyParser.json()); //needed for req.body
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.use(cors());
console.log("Starting my cool server");

app.post('/email', function(req, res) {
    console.log('received email request...');
    
    const fullMessage = JSON.stringify(req.body);

    var msg = {
        to: 'pensia.dp.ua@pensia.dp.ua',
        from: 'pensia.dp.ua@pensia.dp.ua',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<strong>${fullMessage}</strong>`,
      };

    sgMail.send(msg, function(err, json) {
    if (err) { 
        return res.send("Problem Sending Email!!!!");
    }
        console.log(json);
        res.send("Email Sent OK!!!!");
    });
});
var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port')  ) ;
});