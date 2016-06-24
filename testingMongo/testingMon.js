var mongoose = require('mongoose');
var _ = require('underscore');
mongoose.connect('mongodb://adisri:srivatsan21@ds015194.mlab.com:15194/heroku_d8nx0g82');

var VendorSchema = mongoose.Schema({
    Name: String,
    HourOfOperation: String,
    Days: String,
    Menu: [{Name:String,
            Price: Number}],
    CuisineType: String,
    PhoneNumber: String,
    Email: String,
    Registration: String,
    Other:[String],
    LocationAddress: String,
    Employees: [String],
    Website: String,
    Popularity: Number,
    Wifi: Boolean
});

var Vendor = mongoose.model('VendorInfo', VendorSchema);

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

/* expamle update

Vendor.update({Name:'Trivano'}, {Days:'M-F'}, {multi:false}, function(err) {
  console.log(err);
  db.close();
}) */

/* example save
  Vendor.find(function(err,ven) {
  console.log(ven);
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

    Vendor.find(function(err, ven) {
        console.log(ven[1].Menu);
    })

});
