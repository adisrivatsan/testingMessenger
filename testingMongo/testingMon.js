var mongoose = require('mongoose');
var _ = require('underscore');
mongoose.connect('mongodb://adisri:srivatsan21@ds015194.mlab.com:15194/heroku_d8nx0g82');


var schemaOfVendor = require('../schemas/vendorSchema');
var VendorSchema = schemaOfVendor;
var customerSchema = require('../schemas/customerSchema');
var ItemSchema = require('../schemas/ItemSchema');
var OrderSchema = require('../schemas/OrderSchema');

var Vendor = mongoose.model('VendorInfo', VendorSchema);
var Customer = mongoose.model('CustomerInfo',customerSchema);
var Item = mongoose.model('ItemInfo',ItemSchema);
var Order = mongoose.model('OrderInfo',OrderSchema);

//examples
var Trivano = new Vendor({
    Name: 'Trivano',
    HourOfOperation: '10-3',
    Days: 'M-F',
    Menu: ['pizza','pasta'],
    CuisineType: 'italian',
    PhoneNumber: '9786546633',
    Email: 'trivano@seas.upenn.edu',
    Registration: '',
    Other:[''],
    LocationAddress: '',
    Employees: [''],
    Website: '',
    Popularity: '',
    Wifi: true
});

var AmericanExpierence = new Vendor({
  Name: 'American Expierence',
  HourOfOperation: '7-5',
  Days: 'M-S',
  Menu: ['Cheese Stake','bagel'],
  CuisineType: 'American',
  PhoneNumber: '5589746622',
  Email: 'ame@seas.upenn.edu',
  Registration: '',
  Other:[''],
  LocationAddress: '',
  Employees: [''],
  Website: '',
  Popularity: '',
  Wifi: true
});

var SandwitchShop = new Vendor({
  AccountOwnerFirstName:'john',
  AccountOwnerLastName:'smith',
  VendorName:'SandwitchShop',
  PublicEmail:'',
  OwnerEmail:'',
  OwnerWorkPhone:'',
  OwnerCell:'',
  OwnerCell2:'',
  PublicPhone:'',
  HourOfOperation:'1-24',
  DaysOfOperation:'',
  Menu:['5796ddc799aa38eb09dff044','5796de4a35db14480adb3b2d'],
  VendorCuisineType:'',
  AccountType:'',
  LocationAddress:'',
  ZipCode:'',
  Employees:'',
  Website:'',
  PercentRating:0,
  UserComments:'',
  Wifi:'',
  ImageUrl:'',
  Delivery:'',
  OrderID:'',
  SenderID:'',
  LineLength:4
})

var Adi = new Customer({
  FirstName:'Adi',
  LastName:'Srivat',
  Email:'',
  FavoriteStops:['5796e1b374480c450b0d6ce6'],
  SenderID:'',
  UsualLocations:'',
  OrderIDs:[]
});

var FirstOrder = new Order({
  FoodItemIDs:['5796ddc799aa38eb09dff044'],
  VendorID:['5796ddc799aa38eb09dff044'],
  Price:5,
  Currency:'USD',
  DatePurchased:'',
  TimePurchased:'',
  EmployeeName:'',
  CustomerID:['5796e2b4f75b63880badfdee'],
  Comments:''
})


//sample Item

var sampleItem = new Item({
  Name:'Eggsalad Sandwitch',
  Price:7,
  Currency:'USD',
  TimesOrder:4,
  PictureURL:'',
  PictureFile:'',
  Category:'Sandwitch',
  PossibleAddOns:[{
    Name: 'lettuce',
    Price:0.5
  }, {
    Name: 'cheese',
    Price:0.8
  }]
});




/* sampleItem.save(function(err,data){
  console.log('this is working');
});

/* expamle update

Vendor.update({Name:'Trivano'}, {Days:'M-F'}, {multi:false}, function(err) {
  console.log(err);
  db.close();
}) */

/* example save
  Vendor.find(function(err,ven) {
  console.log(ven);
  })
  Example Add
  Data.save(function(err,data){
  console.log('is working');
})
*/

var menuTemp = {
  Menu : [{
    Name: 'Bagel',
    Price: 3
  },{
    Name: 'Cheese Stake',
    Price:8
  }]
};

var store = [];
store.push({'hi':'hello'});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    //var data = db.collection('FoodTruckVendorInfo').find();
    //console.log(data);
    console.log('hello');
  /* Vendor.update({Name:'Trivano'}, {Latitude: 23.5}, {multi:false}, function(err) {
      console.log(err);
      console.log('working');

    }) */



  /*  Vendor.find(function(err, ven) {
        Customer.find(function(err,cust){
          console.log(ven);
          db.close();
        })

    }) */




});
