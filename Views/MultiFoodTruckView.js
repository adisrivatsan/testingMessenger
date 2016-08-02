var multiView = function (farr) {

  var buttonArr = [];

  for (var i = 0; i < farr.length; i++) {
    if(farr[i].VendorName) {
      var button = {
        "type" : "postback",
        "title": farr[i].VendorName,
        "payload": farr[i]._id
      }
      buttonArr.push(Object.assign({},button));
    }

    var bArray1 =[];
    var bArray2 =[];
    var bArray3 =[];




  var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": 'Food Truck Options',
                    "image_url": 'http://www.hoodmart.com/blog/images/food-truck-line.jpg',
                    "buttons": buttonArr
                }],

            }
        }
    }

    return messageData;

}

module.exports = multiView;
