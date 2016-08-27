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
  var firstFive = [];

  for (var i = 0; i < 5; i++) {
    firstFive[i] = buttonArr[i];
  }

  var messageData = {
    attachment: {
        type: "template",
        payload: {
            template_type: "button",
            text: "What do you want to do next?",
            buttons: firstFive
        }
    }
  }

    return messageData;

}

module.exports = multiView;
