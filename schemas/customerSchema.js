var mongoose = require('mongoose');
var CustSchema = mongoose.Schema({
    FirstName: String, //First name of the user
    LastName: String, //Last name of the user
    OrderingHistory: [String], //stores all the past orders of customers
    Email: String, //Email of user
    FavoriteStops: [String], //Favorite vendor destination (saves 10 of them)
    SenderID: String, //Specific sender address for the Facebook Bot
    UsualLocations:[String], // the top 5 typical location the customer orders from
    Cart:[String], //id of items in the current cart.
    SenderID:String, //facebook sender ID
    StripeToken:String, //credit card token
    StripeCustomerTok:String //stripe customer token
});

module.exports = CustSchema;
//test
