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
      } else if(bArray1.length <= 2) {
        bArray1.push(buttonArr[i]);
      } else if (bArray2.length <= 2) {
        bArray2.push(buttonArr[i]);
      } else if (bArray3.length <=2) {
        bArray3.push(buttonArr[i]);
      }

    }




  var messageData = {
    attachment: {
        type: "template",
        payload: {
            template_type: "button",
            text: "What do you want to do next?",
            buttons: [buttonArr]
        }
    }
  }

    return messageData;

}

module.exports = multiView;
