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
                    "title": 'Food Truck Near You',
                    "image_url": 'http://previews.123rf.com/images/arcady31/arcady311007/arcady31100700060/7466256-Top-rated-stamp-Stock-Photo-best.jpg',
                    "buttons": buttonArr
                }],

            }
        }
    }

    return messageData;

}

module.exports = multiView;
