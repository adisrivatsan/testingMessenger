var singleFoodTruck = function (name, imageURL) {
  var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": name,
                    "subtitle": "Food Truck To Order",
                    "image_url": imageURL,
                    "buttons": [{
                        "type": "postback",
                        "title": "Menu",
                        "payload":name + "\tMenu"
                    }, {
                        "type": "postback",
                        "title": "Order",
                        "payload": name + "\tOrder"
                    }],
                }],

            }
        }
    }
    return messageData;
}
module.exports = singleFoodTruck;
