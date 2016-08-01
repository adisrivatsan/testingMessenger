var multiView = function (arr,titleText,imageUrl,payloadTag) {

  var buttonArr = [];

  for (var i = 0; i < arr.length; i++) {
    if(arr[i]) {
      var button = {
        "type" : "postback",
        "title": arr[i],
        "payload": arr[i] +payloadTag
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
                    "subtitle": "Click on one",
                    "image_url": imageUrl,
                    "buttons": buttonArr
                }],

            }
        }
    }

    return messageData;

}

module.exports = multiView;
