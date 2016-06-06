var express = require("express");
 var app = express();
 var port = process.env.PORT || 3000;
 var bodyParser = require('body-parser');
 var request = require('request');

 app.use(express.static(__dirname));

 app.use(bodyParser.json());


 app.get("/", function (req,res) {
 	res.sendFile(__dirname + '/index.html');
 })

 app.get('/webhook/', function (req, res) {
   if (req.query['hub.verify_token'] === '<validation_token>') {
     res.send(req.query['hub.challenge']);
   }
   res.send('Error, wrong validation token');
 })

 app.post('/webhook/', function (req, res) {
   messaging_events = req.body.entry[0].messaging;
   for (i = 0; i < messaging_events.length; i++) {
     event = req.body.entry[0].messaging[i];
     sender = event.sender.id;
     if (event.message && event.message.text) {
       text = event.message.text;
       console.log(text);
       console.log(sender); 
       sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
     }
   }
   res.sendStatus(200);
 });

 var token = "EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD";

function sendTextMessage(sender, text) {
  var messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

 app.listen(port);
 console.log("listening on port " + port);
