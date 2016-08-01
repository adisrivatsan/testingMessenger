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
var sendGenericMessage = arrFunc[1];

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

var getFTGivenID = function(collection,foodTruckId) {
  return _.find(collection,function(num) {
    return num._id == foodTruckId;
  })
}

var getItemGivenID = function(collection,ItemID) {
  return _.find(collection,function(num) {
    return num._id == ItemID;
  })
}

//gets open food trucks.
var foodTruckOpen = function(collection) {
  return _.filter(collection,function(num) {
    var d = new Date();
    var hours = num.HourOfOperation;
    var split = hours.split('-');
    var start = split[0];
    var end = split[1];
    var current = d.getHours();
    return (start < current) && (current<end);
  })
}

//gets Geographicall Close Food Trucks
var geoGraphicallyCloseVendors = function(lat,long) {
  var incChange = 0.02;
  var upperLat = lat + incChange;
  var lowerLat = lat - incChange;
  var upperLong = long + incChange;
  var lowerLong = long - incChange;
    _.filter(collection,function(num) {
      var insideLat = Math.max(upperLat,lowerLat) > num.Latitude && num.Latitude >
      Math.min(upperLat,lowerLat);
      var insideLong = Math.max(upperLong,lowerLong) > num.Longitude && num.Longitude >
      Math.min(upperLong,lowerLong);
      return insideLat && insideLong;
    })
}


//template filtering algo
var templateFilter = function(limit, property,collection) {
  var sortList = _.sortBy(collection,property);
  var segment = _.first(sortList,limit);
  return segment;
}
//top rated food trucks
var topRatedFoodTrucks = templateFilter(5,'PercentRating');
//top 5 shortest Lines
var shortestLineFoodTruck = templateFilter(5, 'LineLength');

var cheapestFoodTruck = templateFilter(5,'AvgPrice');

var healthyFoodTruck = templateFilter(5,'AvgCalorieCount');




//messenger bot set up
 app.get('/webhook/', function (req, res) {
   if (req.query['hub.verify_token'] === '<validation_token>') {
     res.send(req.query['hub.challenge']);
   }
   res.send('Error, wrong validation token');
 })

//importing files
var singleFoodView = require('./Views/singleFoodView');
var multiFoodTruckView = require('./Views/MultiFoodTruckView');
//var rView = require('./Views/recietView');
//var singleRView = require('./Views/singleFoodRecietView');
//var readyCheckout = require('./Views/readToCheckOut');
var pictureModule = require('./PagePicture/write.js');
var convert = require('./PagePicture/testConvert.js');
//var testPicView = require('./Views/sampleImageView');
var categoryView = require('./Views/categoryView');
var flexiblePropertyView = require('./Views/FlexiblePropertyView');
var singleItemView = require('./Views/singleItemView');

//data set up.


//set up schema
var VendorSchema = require('./schemas/vendorSchema');
var Vendor = mongoose.model('VendorInfo', VendorSchema);
var ItemSchema = require('./schemas/ItemSchema');
var Item = mongoose.model('ItemInfo',ItemSchema);
var CustomerSchema = require('./schemas/customerSchema');
var Customer = mongoose.model('ItemInfo',ItemSchema);
var OrderSchema = require('./schemas/OrderSchema');
var Order = mongoose.model('ItemInfo',ItemSchema);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//open database
db.once('open', function callback () {

//list of vendors
Vendor.find(function (err, ven) {
  Item.find(function(err,item) {
    Customer.find(function(err,cus) {
      Order.find(function(err,ord){





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
          var select = getFTGivenName(ven,text);

          geocoder.geocode(text,function(err,data) {
            if(!err) {

            }
          })


          //Hard-coded text sample(for testing)
          //First ELIF: Shows the intro view
          //Second ELIF: If input is a foodtruck it takes user to given foodtruck view
          //Third ELIF: If the input is a cuisine then return an array of food trucks
          if(text == 'hello' ||  text == 'Hello') {
            sendTextMessage(sender,'you said hello');
            sendTextMessage(sender,'yo baby' + nameArray);
            sendTextMessage(sender,'yo baby' + getFTGivenName(ven,'Trivano').HourOfOperation);
          } else if(text == 'hey' || text == 'welcome'|| text == 'Welcome') {
            sendTextMessage(sender,'Hi! Looking to order food? We can help! Welcome to Parachute...Cut the line at Food Trucks near you');
            sendGenericMessage(sender, introView);
          } else if(select){
              var bundle = singleFoodView(text,'http://static1.squarespace.com/static/530440fee4b0c7c348bab85a/t/538ff27fe4b00e487bcaaab6/1401942655441/');
              //chosenFoodTruck = select;

              sendGenericMessage(sender,bundle);
              //inSingleFoodTruck = true;
          } else if(foodTruckCuisine.length !=0) {
            var mdata = multiFoodTruckView(foodTruckCuisine);
            sendGenericMessage(sender,mdata);
          }

        }
        //button handling()
        else if(event.postback) {

          //Variables related to the button press
          var payload = event.postback.payload;

          var select = getFTGivenID(ven,payload);
          var Menusplit = payload.split('\t');
          var id = Menusplit[0];
          var specification = Menusplit[1];

          //categories
          var categorySplit = payload.split('*(7)');
          var truckId = categorySplit[1];
          var selectCategory = categorySplit[0];

          //items
          var itemSplit = payload.split('*(8)');
          var itemTruckId = itemSplit[1];
          var itemSelectId = itemSplit[0];

          //orderItem
          var orderItem = payload.split('*(9)');
          var task = orderItem[0];
          var itemOrderId = orderItem[1];
          var orderTruckId = orderItem[2];

          //geting the Menu
          if(specification == 'Menu') {
            sendTextMessage(sender,'in menu');
            var chosenFoodTruck = getFTGivenID(ven,id);
            sendTextMessage(sender,chosenFoodTruck.VendorName);
            if(chosenFoodTruck) {
              var itemMenu = _.map(chosenFoodTruck.Menu,function(ele) {
                return getItemGivenID(item,ele);
              })
              var repeatCategory = _.map(itemMenu,function(ele) {
                return ele.Category;
              })
              var uniqCategory = _.uniq(repeatCategory);
              sendTextMessage(sender,'hello' + uniqCategory);
              //var bundle = multiItemView(itemMenu,'Name','Options','http://blogs.nordstrom.com/fashion/files/2016/06/barbecue-party-recipe-ideas-full-menu-entree-side-dish-dessert-drinks-700x700.jpg');
              var bundle2 = categoryView(uniqCategory,chosenFoodTruck.VendorName,'http://blogs.nordstrom.com/fashion/files/2016/06/barbecue-party-recipe-ideas-full-menu-entree-side-dish-dessert-drinks-700x700.jpg','*(7)' +chosenFoodTruck._id);
              sendGenericMessage(sender,bundle2);

            } else {
              sendTextMessage(sender,'click on a food Truck first');
            }


          }
            //getting the Categories
          else if(truckId) {

            var thisFoodTruck = getFTGivenID(ven,truckId);
            sendTextMessage(sender,thisFoodTruck._id);
            var itemMenu = _.map(thisFoodTruck.Menu,function(ele) {
              return getItemGivenID(item,ele);
            })
            var foodInCategory = _.filter(itemMenu,function(el) {
              return el.Category === selectCategory;
            })
            var bundle = flexiblePropertyView(foodInCategory,'Name','_id', 'List Of Items','*(8)' + thisFoodTruck._id,'http://www-tc.pbs.org/food/wp-content/blogs.dir/2/files/2013/01/sandwiches-2.jpg');
            sendGenericMessage(sender,bundle);

            //geting single item
          }
          //getting items
          else if(itemTruckId) {
              var givenItem = getItemGivenID(item,itemSelectId);
              var bundle = singleItemView(givenItem,itemTruckId);
              sendGenericMessage(sender,bundle);
          }
          else if(itemOrderId) {
            var givenItem = getItemGivenID(item,itemOrderId);
            if(task==='AddOrder') {
              var bundle = flexiblePropertyView(givenItem.PossibleAddOns,'Name','_id','Add Ons',orderTruckId);
              sendGenericMessage(sender,bundle);
            }
            else if(task === 'back') {
              var selectCategory = givenItem.Category;
              var thisFoodTruck = getFTGivenID(ven,orderTruckId);
              var itemMenu = _.map(thisFoodTruck.Menu,function(ele) {
                return getItemGivenID(item,ele);
              })
              var foodInCategory = _.filter(itemMenu,function(el) {
                return el.Category === selectCategory;
              })
              var bundle = flexiblePropertyView(foodInCategory,'Name','_id', 'List Of Items','*(8)' + thisFoodTruck._id,'http://www-tc.pbs.org/food/wp-content/blogs.dir/2/files/2013/01/sandwiches-2.jpg');
              sendGenericMessage(sender,bundle);
            }
          }

          else if(specification =='Order') {
            sendTextMessage(sender, 'Please Type in your order');
          } else if(specification == 'Address') {
            sendTextMessage(sender,foodTruck.LocationAddress);


          }
          else if(payload == 'Area') {
            var mdata = multiFoodTruckView(ven);
            sendGenericMessage(sender,mdata);
            //sendTextMessage(sender, 'please enter your zip code');


          } else if(payload=='SLine'|| payload=='BBuck') {
            var mdata = multiFoodTruckView(ven);
            sendGenericMessage(sender,mdata);

          }
          else if(payload=='TRated') {

            var mdata = multiFoodTruckView(ven);
            sendGenericMessage(sender,mdata);

          } else if(payload == 'Cuisine') {
            sendTextMessage(sender,'please enter cuisine');


          } else if(select) {
              var bundle = singleFoodView(select,'http://static1.squarespace.com/static/530440fee4b0c7c348bab85a/t/538ff27fe4b00e487bcaaab6/1401942655441/');
              sendTextMessage(sender,"description: " + select.Description);
              sendGenericMessage(sender,bundle);

          } else if(payload == 'Order') {
            sendTextMessage(sender, 'Please Type in next order');
          } else if (payload =='CheckOut') {
            var view = rView(cart,chosenFoodTruck.Name);
            sendGenericMessage(sender,view);
            //chosenFoodTruck = {};
          }

        }
      }
      res.sendStatus(200);
    });
    db.close();
})
})
})
})
});





 app.listen(port);
 console.log("listening on port " + port);
