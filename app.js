var express = require('express');
var app = express();
 var port = process.env.PORT || 3000;
 var bodyParser = require('body-parser');
 var request = require('request');
 var fs = require('fs');
 var pg = require('pg');
 var _ = require('underscore');
 var Q = require('q');

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
var arrFunc = require('./sendingMessages/templateSend');
var sendTextMessage = arrFunc[0];
var testView = arrFunc[1];


 app.get('/webhook/', function (req, res) {
   if (req.query['hub.verify_token'] === '<validation_token>') {
     res.send(req.query['hub.challenge']);
   }
   res.send('Error, wrong validation token');
 })


var singleFoodTruck = require('./Views/singleFoodView');


 //welcomeMessage();


//mongo Set up
var VendorSchema = require('./schemas/vendorSchema');

var Vendor = mongoose.model('VendorInfo', VendorSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//states
var inSingleFoodTruck = false;
var holyText = {};

db.once('open', function callback () {


  Vendor.find(function (err, ven) {

    app.post('/webhook/', function (req, res) {
      var messaging_events = req.body.entry[0].messaging;
      console.log('This is the payload !!!!  ' + JSON.stringify(messaging_events[0]));

      for (i = 0; i < messaging_events.length; i++) {
        event = messaging_events[i];
        console.log('event ' + event);
        sender = event.sender.id;
        if (event.message && event.message.text) {
          text = event.message.text;
          console.log(event.message.seq);
          //sendTextMessage(sender,'wow' + holyText);
          //sendTextMessage(sender, 'wow' + inSingleFoodTruck);
          //sendTextMessage(sender, 'hello ' + JSON.stringify(req.body.postback.payload));
          var nameArray = _.map(ven,function (num) {
            return num.Name;
          })
          var specificFoodTruck = function(foodTruckName) {
            var item = _.find(ven,function(num) {
              return num.Name == foodTruckName;
            })
            return item;
          }

          var select = specificFoodTruck(text);
          if(text == 'hello' ||  text == 'Hello') {
            sendTextMessage(sender,'you said hello');
            sendTextMessage(sender,'yo baby' + nameArray);
            sendTextMessage(sender,'yo baby' + specificFoodTruck('Trivano').HourOfOperation);
          } else if(text == 'hey' || text == 'welcome'|| text == 'Welcome') {
            testView(sender, introView);
          } else if(select){
              var bundle = singleFoodTruck(text,'http://static1.squarespace.com/static/530440fee4b0c7c348bab85a/t/538ff27fe4b00e487bcaaab6/1401942655441/');
              holyText = select;
              sendTextMessage(sender, 'yes' + holyText);
              //testView(sender, bundle[0]);
              testView(sender,bundle);
              inSingleFoodTruck = true;
          } else if(inSingleFoodTruck) {

            //console.log(holyText.Menu);
            if(text =='Menu') {
              var menuItems = holyText.Menu;
              console.log(holyText);
              for (var i = 0; i < menuItems.length; i++) {
                sendTextMessage(sender, '' + menuItems[i].Name + ': ' +
                menuItems[i].Price);
              }
              sendTextMessage(sender, 'Please type what you want to order');
              inSingleFoodTruck = false;
            } else if(text == 'Order') {
              sendTextMessage(sender, 'Please type in your order');
              inSingleFoodTruck = false;
            }
          }

          //console.log('this is bool' + inSingleFoodTruck);

        }
        else if(event.postback) {
          var payload = event.postback.payload;
          sendTextMessage(sender,payload); 
        }
      }
      res.sendStatus(200);
    });
    db.close();
})

});



 app.listen(port);
 console.log("listening on port " + port);
