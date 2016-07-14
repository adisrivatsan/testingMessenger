//Libraries
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
var geocoder = require('geocoder');

mongoose.connect('mongodb://adisri:srivatsan21@ds015194.mlab.com:15194/heroku_d8nx0g82');

//set up
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/Website'));
app.use(bodyParser.json());
app.get("/", function (req,res) {
 	res.sendFile(__dirname + '/Website/index.html');
 })

 //views

var introView = require('./Views/introView2');
var arrFunc = require('./sendingMessages/templateSend');

//functions: to be added to.
var sendTextMessage = arrFunc[0];
var testView = arrFunc[1];

//to be moved to a different file. Collection needs Name property.
var getNameArray = function(collection) {
  return _.map(collection,function (num) {
    return num.Name;
  });
}
var getFTGivenName = function(collection,foodTruckName) {
  return _.find(collection,function(num) {
    return num.Name == foodTruckName;
  })
}




//messenger bot set up
 app.get('/webhook/', function (req, res) {
   if (req.query['hub.verify_token'] === '<validation_token>') {
     res.send(req.query['hub.challenge']);
   }
   res.send('Error, wrong validation token');
 })

//importing files
var singleFoodTruck = require('./Views/singleFoodView');
var multiView = require('./Views/MultiFoodTruckView');
var rView = require('./Views/recietView');
var singleRView = require('./Views/singleFoodRecietView');
var readyCheckout = require('./Views/readToCheckOut');
var pictureModule = require('./PagePicture/write.js');
var convert = require('./PagePicture/testConvert.js');
var testPicView = require('./Views/sampleImageView');
var mulViewTopRated = require('./Views/multiViewTopRated');

//data set up.
var holyText = {};
var cart = [];


//set up schema
var VendorSchema = require('./schemas/vendorSchema');
var Vendor = mongoose.model('VendorInfo', VendorSchema);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//open database
db.once('open', function callback () {

//list of vendors
Vendor.find(function (err, ven) {
    // function input: type of cuisine and returns list of food trucks
    var cuisine = function (type) {
      var list =  _.filter(ven, function(num) {
      return num.CuisineType == type;
    })
    return list;
  }

//Listens for incoming actions from the user
    app.post('/webhook/', function (req, res) {
      var messaging_events = req.body.entry[0].messaging;

      //Loops through all the user messages
      for (i = 0; i < messaging_events.length; i++) {
        event = messaging_events[i];
        console.log('event ' + event);
        sender = event.sender.id;
        //listening for text
        if (event.message && event.message.text) {
          text = event.message.text;
          console.log(event.message.seq);

          // given list of food truck will get names of all food trucks
          var nameArray = getNameArray(ven);

          //List of food trucks with a given cuisine
          var foodTruckCuisine = cuisine(text);
          var select = getFTGivenName(text);



          //Hard-coded text sample(for testing)
          //First ELIF: Shows the intro view
          //Second ELIF: If input is a foodtruck it takes user to given foodtruck view
          //Third ELIF: If the input is a cuisine then return an array of food trucks
          if(text == 'hello' ||  text == 'Hello') {
            sendTextMessage(sender,'you said hello');
            sendTextMessage(sender,'yo baby' + nameArray);
            sendTextMessage(sender,'yo baby' + getFTGivenName(ven,'Trivano').HourOfOperation);
          } else if(text == 'hey' || text == 'welcome'|| text == 'Welcome') {
            sendTextMessage(sender,'Please enter your zip code for accurate location');
            testView(sender, introView);
          } else if(select){
              var bundle = singleFoodTruck(text,'http://static1.squarespace.com/static/530440fee4b0c7c348bab85a/t/538ff27fe4b00e487bcaaab6/1401942655441/');
              holyText = select;
              testView(sender,bundle);
              //inSingleFoodTruck = true;
          } else if(foodTruckCuisine.length !=0) {
            
            var mdata = multiView(foodTruckCuisine);
            testView(sender,mdata);
          }

        }
        //button handling()
        else if(event.postback) {

          //Variables related to the button press
          var payload = event.postback.payload;
          var select = getFTGivenName(ven,payload);
          var split = payload.split('\t');
          var name = split[0];
          var specification = split[1];
          var foodTruck = getFTGivenName(ven,name);
          var foodTruckOpen = _.filter(ven,function(num) {
            var d = new Date();
            var hours = num.HourOfOperation;
            var split = hours.split('-');
            var start = split[0];
            var end = split[1];
            var current = d.getHours();
            return (start < current) && (current<end);
          })
          if(specification == 'Menu') {

            sendTextMessage(sender,foodTruck.ImageUrl);
            if(foodTruck.ImageUrl) {
              sendTextMessage(sender,'in url');
              testView(sender,testPicView(foodTruck.ImageUrl));
            } else {
              testView(sender,testPicView('http://www.petakids.com/wp-content/uploads/2015/04/Bunny-Outside.jpg'));
            }


          //TO BE CLEANED
          } else if(specification =='Order') {
            sendTextMessage(sender, 'Please Type in your order');
          } else if(specification == 'Address') {
            sendTextMessage(sender,foodTruck.LocationAddress);

          }
          else if(payload == 'Area') {
            var mdata = multiView(ven);
            testView(sender,mdata);
            //sendTextMessage(sender, 'please enter your zip code');


          } else if(payload=='SLine'|| payload=='BBuck') {
            var mdata = multiView(ven);
            testView(sender,mdata);

          }
          else if(payload=='TRated') {
            //display top five rated.
            vendorArr = [];

            var mdata = mulViewTopRated(ven);
            testView(sender,mdata);

          } else if(payload=='Open') {
            if(foodTruckOpen.length >0) {
              var mdata = multiView(foodTruckOpen);
              testView(sender,mdata);
            } else {
              sendTextMessage(sender,'no food trucks open');
            }


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
