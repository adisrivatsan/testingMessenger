var multiView = function (farr) {

  var buttonArr = [];

  for (var i = 0; i < farr.length; i++) {
    var button = {
      "type" : "postback",
      "title": farr[i].Name,
      "payload": farr[i].Name
    }
    buttonArr.push(Object.assign({},button));
  }

  var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": 'What would you like Today?',
                    "subtitle": "Click to see our options",
                    "image_url": 'http://www.hoodmart.com/blog/images/food-truck-line.jpg',
                    "buttons": buttonArr
                }],

            }
        }
    }

    return messageData;

}

module.exports = multiView;
