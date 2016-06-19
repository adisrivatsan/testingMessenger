var singleFoodTruck = function (name, imageURL) {
  var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": name,
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": imageURL,
                    "buttons": [{
                        "type": "postback",
                        "title": "Menu",
                        "payload":"Menu"
                    }, {
                        "type": "postback",
                        "title": "Order",
                        "payload": "Order"
                    }],
                }],

            }
        }
    }
    return messageData;
}
module.exports = singleFoodTruck;
