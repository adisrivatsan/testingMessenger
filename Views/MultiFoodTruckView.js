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
  }
    var bArray1 =[];
    var bArray2 =[];
    var bArray3 =[];
    for (var i = 0; i < buttonArr.length; i++) {
      if(bArray1.length === 0) {
        bArray1.push(buttonArr[i]);
      } else if (bArray2.length === 0) {
        bArray2.push(buttonArr[i]);
      } else if (bArray3.length === 0) {
        bArray3.push(buttonArr[i]);
      } else if(bArray1.length >= 3) {
        bArray1.push(buttonArr[i]);
      } else if (bArray2.length >= 3) {
        bArray2.push(buttonArr[i]);
      } else if (bArray3.length >=3) {
        bArray3.push(buttonArr[i]);
      }

    }




  var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": 'Food Truck Options',
                    "image_url": 'http://www.hoodmart.com/blog/images/food-truck-line.jpg',
                    "buttons": bArray1
                },{
                  "title": 'Food Truck Options',
                  "image_url": 'http://www.hoodmart.com/blog/images/food-truck-line.jpg',
                  "buttons": bArray2
                }, {
                  {
                    "title": 'Food Truck Options',
                    "image_url": 'http://www.hoodmart.com/blog/images/food-truck-line.jpg',
                    "buttons": bArray3
                  }
                }],

            }
        }
    }

    return messageData;

}

module.exports = multiView;
