var messageData = {
      "attachment": {
          "type": "template",
          "payload": {
              "template_type": "generic",
              "elements": [{
                  "title": 'Are You Ready To CheckOut?',
                  "subtitle": "Click to order more",
                  "image_url": 'http://www.boughtmovie.com/free-viewing/images/whenever-ready.png',
                  "buttons": [{
                      "type": "postback",
                      "title": "CheckOut",
                      "payload":"CheckOut"
                  }, {
                      "type": "postback",
                      "title": "Order More",
                      "payload": "Order"
                  }],
              }],

          }
      }
  }

module.exports = messageData;
