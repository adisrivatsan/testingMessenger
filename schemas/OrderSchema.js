var mongoose = require('mongoose');
var OrderSchema = mongoose.Schema({
  { //What each order contains
    FoodItem: String, //what the food item is
    VendorID:String, //what the vendor id is
    Price: Number, //total price of all the foods
    Currency:String, //currency of the price unit
    DataPurchased: String, //the date that the order happened
    TimePurchased:String, //time order occured
    EmployeeName:String, //employee working at the time
    CustomerID:String, //Id of the Customer
    Comments: {
      Comment: String,//the contents of the Comments
      Rating: Number //how the customer rated the place
    }
  }
});

module.exports = OrderSchema;
