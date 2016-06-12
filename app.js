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

//JSONS

var introView = require('./introView');


var buttonTest = {
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
      payload:"this is Adi"
    }
  ]
}
}
};

var imageTest = {
  attachment: {
    type: "image",
    payload: {
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Moraine_Lake_17092005.jpg"
    }
  }
}

var recieptTest = {
  attachment: {
    type: "template",
    payload: {
      template_type: "receipt",
      recipient_name: "Aditya",
      order_number: "300",
      currency: "AED",
      payment_method: "credit",
      elements: [{
        title: "one",
        price: 5
      }, {
        title: "two",
        price: 10
      }],
      summary: {
        total_cost: 30
      }
    }
  }
};

var welcomeMessage = function() {
  var options = {
  url: 'https://graph.facebook.com/v2.6/1768741990005872/thread_settings?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
  method: 'POST',
  setting_type:"call_to_actions",
  thread_state:"new_thread",
  call_to_actions:[
    {
      message:{
        text:"Welcome to My Company!"
      }
    }
  ]
}
request(options,function(error,body,response){
  console.log(error);
})
}
 welcomeMessage();


 app.post('/webhook/', function (req, res) {
   var messaging_events = req.body.entry[0].messaging;

   for (i = 0; i < messaging_events.length; i++) {
     event = messaging_events[i];
     console.log('event ' + event);
     sender = event.sender.id;
     if (event.message && event.message.text) {
       text = event.message.text;
       console.log(event.message.seq);

       /*
          Get the 3 buttons on the screen
          Load up list of food trucks (dynamic)
          Render from html
          data store that can map food truck name to order
          all the other views.
       */



       if(text == 'hello') {
         sendTextMessage(sender,'you said hello');
       }

       //sendTextMessage(sender, 'test message working');
       //testButton(sender,recieptTest);
       //testView(sender, imageTest);
       testView(sender, introView);
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

function testView (sender,messageJson) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageJson
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
