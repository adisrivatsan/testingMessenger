var singleItem = function (obj,foodTruckTag, imageURL) {
  var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": obj.Name,
                    "buttons": [{
                        "type": "postback",
                        "title": "Add To Order",
                        "payload":"AddOrder" + "*(9)" + obj._id+ '*(9)' + foodTruckTag
                    }, {
                        "type": "postback",
                        "title": "Go Back",
                        "payload": "back" + "*(9)" + obj._id + '*(9)' + foodTruckTag
                    }],
                }],

            }
        }
    }
    return messageData; //send data out
}
module.exports = singleItem;
