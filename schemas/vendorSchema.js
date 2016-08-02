var mongoose = require('mongoose');
var VendorSchema = mongoose.Schema({
    AccountOwnerFirstName: String, //First Name of account owner
    AccountOwnerLastName: String, //Last name of account owner
    VendorName: String, //Name of the truck/company
    PublicEmail: String, //Email of the company
    OwnerEmail: String, // Email of the owner
    OwnerWorkPhone: String, //Work phone number of the owner
    OwnerCell: String, //Cell phone number of the owner
    OwnerCell2: String, //Secondary phone number of the owner
    PublicPhone: String, //Company phone number
    HourOfOperation: String, //Hours of operation
    DaysOfOperation: String, //Days of operation
    Menu: [String], //item object IDs
    VendorCuisineType: String, //Type of cuisine the vendor serves
    AccountType: String, //Either Vendor or Customer
    LocationAddress: String, //Address of company
    Latitude:Number, //Latitude of Address
    Longitutde:Number,//Longitude of Address
    Employees: [{ //List of Employees in the company
            Name: String, //Name of employee
            NowWorking: Boolean, //Whether or not the current employee is working right now
    }],
    Website: String, //Website of the company
    PercentRating: Number, //Percent o fpeople who like the company
    UserComments: [String], //User Comment IDs
    Wifi: Boolean, //Whether or not the foodtruck has access to wifi
    ImageUrl: String, //Food truck logo
    ZipCode: String, //Zipcode of truck
    Delivery: Boolean, //Does the company have delivery
    SenderID:String, //For facebook to send messages to vendors.
    LineLength:Number, //Length of a line at a given time.
    OrderID: [String], // String of order IDS.
    AvgPrice: Number,
    AvgCalorieCount:Number, //Number of Average Calories in the Food.,
    Description:String,
    MenuUrl: String
});

module.exports = VendorSchema;
