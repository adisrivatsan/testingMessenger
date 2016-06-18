var mongoose = require('mongoose');
var VendorSchema = mongoose.Schema({
    Name: String,
    HourOfOperation: String,
    Days: String,
    Menu: [String],
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

module.exports = VendorSchema;
