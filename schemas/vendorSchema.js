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
    Menu: [{ //Menu of the items the company sells
        Name: String, //Name of the product
        Price: Number, //Price of the product
        Currency: String, //Currency of Price
        TimesOrder: Number, //Number of times this object was ordered in a week
        PictureURL: String, //Image URL of the food item
        PictureFile: String, //Path of image for foodtruck
    }],
    VendorCuisineType: String, //Type of cuisine the vendor serves
    AccountType: String, //Either Vendor or Customer
    LocationAddress: String, //Address of company
    Employees: [{ //List of Employees in the company
            Name: String, //Name of employee
            NowWorking: Boolean, //Whether or not the current employee is working right now
    }],
    Website: String, //Website of the company
    PercentRating: Number, //Percent o fpeople who like the company
    UserComments: [{ //Users comment on the vendor
        UserName: String, //Name of the commentor
        Comment: String, //Review of the foodtruck
        Rating: Number, //user rating of the foodtruck
        DateAdded: String, //Date the comment was added
    }],
    Wifi: Boolean, //Whether or not the foodtruck has access to wifi
    ImageUrl: String, //Food truck logo
    ZipCode: String, //Zipcode of truck
    Delivery: Boolean //Does the company have delivery
});

module.exports = VendorSchema;
