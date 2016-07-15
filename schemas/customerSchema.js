var mongoose = require('mongoose');
var CustSchema = mongoose.Schema({
    FirstName: String, //First name of the user
    LastName: String, //Last name of the user
    OrderingHistory: [{ //Stores the last 20 recent items
        FoodItem: String, //Name of the food items
        VendorName: String, //Name of the vendor
        Price: Number, //Price of the purchased item
        Currency: String, //Curency used for the purchase
        DatePurchased: String, //Date of purchase
        TimePurchased: String, //Time of purchase
    }],
    Email: String, //Email of user
    FavoriteStops: [String], //Favorite vendor destination (saves 10 of them)
    SenderID: String, //Specific sender address for the Facebook Bot
});

module.exports = CustSchema;
