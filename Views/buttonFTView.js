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


  var messageData = {
    attachment: {
        type: "template",
        payload: {
            template_type: "button",
            text: "What do you want to do next?",
            buttons: buttonArr
        }
    }
  }

    return messageData;

}

module.exports = multiView;
