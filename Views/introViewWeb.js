var messageData = {
      "attachment": {
          "type": "template",
          "payload": {
              "template_type": "generic",
              "elements": [{
                  "title": 'What would you like Today?',
                  "image_url": 'https://imagesdb.herokuapp.com/ft3',
                  "buttons": [{
                      "type": "postback",
                      "title": "Top Rated",
                      "payload":"TRated"
                  }, {
                      "type": "postback",
                      "title": "Shortest line",
                      "payload": "SLine"
                  }, {
                      "type": "postback",
                      "title": "Bang for your buck",
                      "payload": "BBuck"
                  }],
              }, {
                "title": "Food Type",
                "image_url": 'https://imagesdb.herokuapp.com/ft4',
                "buttons": [{
                    "type": "postback",
                    "title": "Philly Specials",
                    "payload":"PSpecial"
                }, {
                    "type": "postback",
                    "title": "Healthy Food",
                    "payload": "HFood"
                }, {
                    "type": "postback",
                    "title": "Cuisines",
                    "payload": "cuisine"
                }
              ]
              }],

          }
      }
  }

module.exports = messageData;
