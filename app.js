var express = require("express");
 var app = express();
 var port = process.env.PORT || 3000;
 var bodyParser = require('body-parser');
 var request = require('request');
 var fs = require('fs');
 var pg = require('pg');
 var _ = require('underscore');
 var q = require('q');

 var mongoose = require('mongoose');
 mongoose.connect('mongodb://adisri:srivatsan21@ds015194.mlab.com:15194/heroku_d8nx0g82');


 app.use(express.static(__dirname));
 app.use(express.static(__dirname + '/Website'));


 app.use(bodyParser.json());

 app.get("/", function (req,res) {
 	res.sendFile(__dirname + '/Website/index.html');
 })

 app.get("/read", function (req,res) {
   console.log(req.body + 'initial');
   var prevText = fs.readFileSync("sample.txt", "UTF-8");
   fs.writeFileSync("sample.txt",prevText + 'wow');
   console.log(req.body);
   var sampleText = fs.readFileSync("sample.txt", "UTF-8");
   console.log('yo yo yo yo ' + sampleText);
   //res.send('working');
 })

//setup vendor information

//requestVendorInfo();

var introView = require('./Views/introView');

 app.get('/webhook/', function (req, res) {
   if (req.query['hub.verify_token'] === '<validation_token>') {
     res.send(req.query['hub.challenge']);
   }
   res.send('Error, wrong validation token');
 })


 //welcomeMessage();

 var VendorSchema = require('./schemas/vendorSchema');


 var Vendor = mongoose.model('VendorInfo', VendorSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  //var data = db.collection('FoodTruckVendorInfo').find();
  //console.log(data);
  console.log('hello');

  Vendor.find(function (err, ven) {
    //console.log(ven[0] + '!!!!!!!');
    app.post('/webhook/', function (req, res) {
      var messaging_events = req.body.entry[0].messaging;

      for (i = 0; i < messaging_events.length; i++) {
        event = messaging_events[i];
        console.log('event ' + event);
        sender = event.sender.id;
        if (event.message && event.message.text) {
          text = event.message.text;
          console.log(event.message.seq);

          if(text == 'hello') {
            sendTextMessage(sender,'you said hello');
            sendTextMessage(sender,'yo baby' + ven[0].Name);
          } else if(text == 'hey' || text == 'welcome') {
            testView(sender, introView);
          }

        }
      }
      res.sendStatus(200);
    });
    db.close();
})

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
