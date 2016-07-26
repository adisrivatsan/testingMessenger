var multiView = function (truckObj,property,titleText,imageUrl) {

  var buttonArr = [];

  for (var i = 0; i < farr.length; i++) {
    if(truckObj[i][property]) {
      var button = {
        "type" : "postback",
        "title": farr[i][property],
        "payload": farr[i]._id
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
