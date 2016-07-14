var mongoose = require('mongoose');
var CustSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    OrderingHistory: [{}],
    Menu: [{
        Name: String,
        Price: Number
    }],
    CuisineType: String,
    PhoneNumber: String,
    Email: String,
    Registration: String,
    Other: [String],
    LocationAddress: String,
    Employees: [String],
    Website: String,
    Popularity: Number,
    Wifi: Boolean,
    ImageUrl: String,
    ZipCode: String
});

module.exports = CustSchema;
