var express = require('express');
var app = express();
 var port = process.env.PORT || 5000;
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
var multiView = require('./Views/MultiFoodTruckView');
var rView = require('./Views/recietView');
var singleRView = require('./Views/singleFoodRecietView');
var readyCheckout = require('./Views/readToCheckOut');
 //welcomeMessage();
var pictureModule = require('./PagePicture/write.js');
var convert = require('./PagePicture/testConvert.js');
var testPicView = require('./Views/sampleImageView');

var holyText = {};
var cart = [];
//mongo Set up
var VendorSchema = require('./schemas/vendorSchema');

var Vendor = mongoose.model('VendorInfo', VendorSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//states
//var inSingleFoodTruck = false;


db.once('open', function callback () {


  Vendor.find(function (err, ven) {
    var cuisine = function (type) {
      var list =  _.filter(ven, function(num) {
      return num.CuisineType == type;
    })
    return list;
  }

    app.post('/webhook/', function (req, res) {
      var messaging_events = req.body.entry[0].messaging;
      //console.log('holy text ' + holyText);
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

          var foodTruckCuisine = cuisine(text);
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
              //inSingleFoodTruck = true;
          } else if(holyText.Menu) {
            var item = _.find(holyText.Menu, function(num) {
              return num.Name == text;
            })
            if(item) {
              cart.push(item);
              testView(sender,readyCheckout);
              //sendTextMessage(sender,"Item" + item);
            }

          } else if(foodTruckCuisine.length !=0) {
            sendTextMessage(sender, 'In the cuisine'); 
            var mdata = multiView(foodTruckCuisine);
            testView(sender,mdata);
          }

          //console.log('this is bool' + inSingleFoodTruck);

        }
        else if(event.postback) {
          var specificFoodTruck = function(foodTruckName) {
            var item = _.find(ven,function(num) {
              return num.Name == foodTruckName;
            })
            return item;
          }
          var payload = event.postback.payload;
          var select = specificFoodTruck(payload);
          var split = payload.split('\t');
          var name = split[0];
          var specification = split[1];
          var foodTruck = specificFoodTruck(name);
          if(specification == 'Menu') {
            var menuItems = foodTruck.Menu;
            //console.log(holyText);
            /*for (var i = 0; i < menuItems.length; i++) {
              sendTextMessage(sender, '' + menuItems[i].Name + ': ' +
              menuItems[i].Price);
            } */
            //pictureModule(name,menuItems,convert);
            testView(sender,testPicView);


          } else if(specification =='Order') {
            sendTextMessage(sender, 'Please Type in your order');
          } else if(specification == 'Address') {
            sendTextMessage(sender,foodTruck.LocationAddress);

          } else if(payload == 'Area'|| payload == 'Open') {
            var mdata = multiView(ven);
            testView(sender,mdata);
          } else if(payload == 'Cuisine') {
            sendTextMessage(sender,'please enter cuisine');
          } else if(select) {
              var bundle = singleFoodTruck(payload,'http://static1.squarespace.com/static/530440fee4b0c7c348bab85a/t/538ff27fe4b00e487bcaaab6/1401942655441/');
              holyText = select;
              sendTextMessage(sender, 'yes' + holyText);
              //testView(sender, bundle[0]);
              testView(sender,bundle);

          } else if(payload == 'Order') {
            sendTextMessage(sender, 'Please Type in next order');
          } else if (payload =='CheckOut') {
            var view = rView(cart,holyText.Name);
            testView(sender,view);
            holyText = {};
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
