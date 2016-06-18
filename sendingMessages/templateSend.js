var request = require('request');
var token = "EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD";

var sendText = function sendTextMessage(sender, text) {
  var messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
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
arrFunc = [sendText,testV];
module.exports = arrFunc; 
