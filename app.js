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
       // Handle a text message from this sender
     }
   }
   res.sendStatus(200);
 });

 app.listen(port);
 console.log("listening on port " + port);
