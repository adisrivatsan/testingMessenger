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

          var nameArray = _.map(ven,function (num) {
            return num.Name;
          })
          var specificFoodTruck = function(foodTruckName) {
            var item = _.find(ven,function(num) {
              return num.Name == foodTruckName;
            })
            return item;
          }



          if(text == 'hello' ||  text == 'Hello') {
            sendTextMessage(sender,'you said hello');
            sendTextMessage(sender,'yo baby' + nameArray);
            sendTextMessage(sender,'yo baby' + specificFoodTruck('Trivano').HourOfOperation);
          } else if(text == 'hey' || text == 'welcome') {
            testView(sender, introView);
          } else if(specificFoodTruck(text)){
              var bundle = singleFoodTruck(text,'http://static1.squarespace.com/static/530440fee4b0c7c348bab85a/t/538ff27fe4b00e487bcaaab6/1401942655441/');
              Q.all([testView(sender, bundle[0])]).done(function() {
                  testView(sender,bundle[1]); 
              })

          }

        }
      }
      res.sendStatus(200);
    });
    db.close();
})

});



 app.listen(port);
 console.log("listening on port " + port);
