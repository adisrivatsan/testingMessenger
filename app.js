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
   var messaging_events = req.body.entry[0].messaging;

   for (i = 0; i < messaging_events.length; i++) {
     event = messaging_events[i];
     console.log('event ' + event);
     sender = event.sender.id;
     if (event.message && event.message.text) {
       text = event.message.text;
       console.log(event.message.seq);

       sendTextMessage(sender, 'hello Benji. How are we doing today');
       addButton(sender);
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
    url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
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

function addButton (sender) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: {
    attachment:{
      type:"template",
      payload:{
        template_type:"button",
        text:"What do you want to do next?",
        buttons:[
          {
            type:"web_url",
            url:"https://petersapparel.parseapp.com",
            title:"Show Website"
          },
          {
            type:"postback",
            title:"Start Chatting",
            payload:"USER_DEFINED_PAYLOAD"
          }
        ]
      }
    }
  }
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
