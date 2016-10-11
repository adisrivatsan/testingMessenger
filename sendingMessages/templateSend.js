var request = require('request');
var token = "EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD";
var Promise = require('promise');


var sendText = function sendTextMessage(sender, text) {
  var messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADwfLzJvdoBAFVaEPFXuHBT65tZCGLhTBQ34g4kKVCrj7ypgJeZCtXYpV0ZAGoSlZAWjqZA9KK4ylPAVuZBA4MTHtTXPDZAESmhuf02ARcusQnjdrKHeqeHNgO81WXAZAZC4zQB9c3U9fHkLVuGEndshHvkKasbNYeeCb5z4ZAAnv3InXi4kBa4mD',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    } else {
      console.log("woowwww!!! In message!!!!!")
      console.log(error)
      console.log(response)
      console.log(body)
    }
  });
}

var testV = function testView (sender,messageJson) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageJson
  }

  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

var testVasync = function testasync(sender,messageJson,nextText) {

  request({
      url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageJson
    }

  }).on('response',function(response) {
    var messageData = {
      text:nextText
    };
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData
    }}).on('response',function(res) {

    })

  }).on('error',function(err) {

  })
}

var twoMessages = function twoMessage(sender,firstMessageText,secondMessageText) {
  var messageData = {
    text:firstMessageText
  };

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData
  }}).on('response',function(res) {
    var messageD = {
      text:secondMessageText
    }
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageD
    }}).on('response',function(res) {

    })

  })

}

var twoGenericMessages = function genMessage(sender,bundle1,bundle2) {
  request({
      url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: bundle1
    }

  }).on('response',function(response) {
    testV(sender,bundle2);
  })
}

var testMessageAsync = function messageAsync(sender,text,callback) {
  var messageData = {
    text:text
  }
   return testVasync(sender,messageData,callback);
}

var sendPictureBeforeMessage = function sendPictureBeforeMessage(sender,bundle,secondMessage) {
  request({
      url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: bundle
    }

  }).on('response',function(response) {
    sendText(sender,secondMessage);
  })
}

var sendPictureTwoMessage = function sendPicTwoMessage(sender,bundle,message1,message2) {
  request({
      url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: bundle
    }

  }).on('response',function(response) {
    sendText(sender,message1);
    sendText(sender, message2);
  })
}



arrFunc = [sendText,testV,testVasync,testMessageAsync,twoMessages,twoGenericMessages,sendPictureBeforeMessage,sendPictureTwoMessage];
module.exports = arrFunc;
