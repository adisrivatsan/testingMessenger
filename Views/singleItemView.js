var singleItem = function (obj, imageURL) {
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
                        "payload":"AddOrder" + "*(9)" + obj._id
                    }, {
                        "type": "postback",
                        "title": "Go Back",
                        "payload": "back" + "*(9)" + obj._id
                    }],
                }],

            }
        }
    }
    return messageData; //send data out
}
module.exports = singleItem;
