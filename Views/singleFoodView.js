var singleFoodTruck = function (obj, imageURL) {
  var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": obj.VendorName,
                    "subtitle": "Food Truck To Order",
                    "image_url": imageURL,
                    "buttons": [{
                        "type": "postback",
                        "title": "Menu",
                        "payload":obj._id + "\tMenu"
                    }, {
                        "type": "postback",
                        "title": "Order",
                        "payload": obj._id + "\tOrder"
                    }, {
                      "type" : "postback",
                      "title" : "Address",
                      "payload": obj._id + "\tAddress"
                    }],
                }],

            }
        }
    }
    return messageData;
}
module.exports = singleFoodTruck;
