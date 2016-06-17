var mongoose = require('mongoose');
mongoose.connect('mongodb://adisri:srivatsan21@ds015194.mlab.com:15194/heroku_d8nx0g82');

var VendorSchema = mongoose.Schema({
    Name: String,
    Hour: String
});

var Vendor = mongoose.model('Vendor', VendorSchema);

var Terry = new Vendor({ Name:'Terry', Hour: '10-11' });

var store = [];
store.push({'hi':'hello'});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  //var data = db.collection('FoodTruckVendorInfo').find();
  //console.log(data);
  console.log('hello');

  Vendor.find(function (err, ven) {
  //if (err) return console.error(err);
  //console.log(ven);
  store.push(ven);
  //console.log(store);
  module.exports = ven;
  db.close();
})

});
