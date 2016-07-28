var multiView = function (truckObj,property,titleText,imageUrl) {

  var buttonArr = [];

  for (var i = 0; i < truckObj.length; i++) {
    if(truckObj[i][property]) {
      var button = {
        "type" : "postback",
        "title": truckObj[i][property],
        "payload": truckObj[i]._id
      }
      buttonArr.push(Object.assign({},button));
    }

  }

  var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": titleText,
                    "image_url": imageUrl,
                    "buttons": buttonArr
                }],

            }
        }
    }

    return messageData;

}

module.exports = multiView;
