var mongoose = require('mongoose');
var ItemSchema = mongoose.Schema({
   //Items the company sells
      Name: String, //Name of the product
      Price: Number, //Price of the product
      Currency: String, //Currency of Price
      TimesOrder: Number, //Number of times this object was ordered in a week
      PictureURL: String, //Image URL of the food item
      PictureFile: String, //Path of image for foodtruck
      Category: String, //category of food that this item is in
      PossibleAddOns: [{
        Name: String, //name of Add On
        Price: String, //price of Add On
        Description: String //description of Add On
      }],
      ItemMenuNumber: String
  })

module.exports = ItemSchema;
