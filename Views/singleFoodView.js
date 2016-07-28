var singleFoodTruck = function (obj, imageURL) {
  var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": obj.VendorName,
                    "subtitle": 'Address: ' + obj.LocationAddress,
                    "image_url": imageURL,
                    "buttons": [{
                        "type": "postback",
                        "title": "Menu",
                        "payload":obj._id + "\tMenu"
                    }, {
                        "type": "postback",
                        "title": "Order",
                        "payload": obj._id + "\tOrder"
                    }],
                }],

            }
        }
    }
    return messageData; //send data out
}
module.exports = singleFoodTruck;
