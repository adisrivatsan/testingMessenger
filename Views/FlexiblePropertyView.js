var multiView = function (arr,nameProperty,payloadProperty,titleText,foodTruckTag,imageUrl) {

  var buttonArr = [];

  for (var i = 0; i < arr.length; i++) {
    if(arr[i]) {
      var button = {
        "type" : "postback",
        "title": arr[i][nameProperty],
        "payload": arr[i][payloadProperty] +foodTruckTag
      }
      buttonArr.push(Object.assign({},button));
    }

  }

if(imageUrl) {
  var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": titleText,
                    "subtitle": "Click on one",
                    "image_url": imageUrl,
                    "buttons": buttonArr
                }],

            }
        }
    }

} else {
  var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": titleText,
                    "subtitle": "Click on one",
                    "buttons": buttonArr
                }],

            }
        }
    }

}

    return messageData;

}

module.exports = multiView;
