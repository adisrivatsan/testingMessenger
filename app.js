var express = require("express");
 var app = express();
 var port = process.env.PORT || 3000;
 app.use(express.static(__dirname));


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
       sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
     }
   }
   res.sendStatus(200);
 });

 var token = "<page_access_token>";

function sendTextMessage(sender, text) {
  var messageData = {
    text:text
  }
  request({
    url: 'https://www.facebook.com/Aditya-Productions-2-1768741990005872/messages/?threadid=100002491919169&mercurythreadid=user%3A100002491919169&timestamp=1465188813726',
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
