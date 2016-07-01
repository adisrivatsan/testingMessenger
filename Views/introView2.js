var messageData = {
      "attachment": {
          "type": "template",
          "payload": {
              "template_type": "generic",
              "elements": [{
                  "title": 'What would you like Today?',
                //  "subtitle": "Click to see our options",
                  "image_url": 'http://wp.streetwise.co/wp-content/uploads//2014/09/unnamed-213.jpg',
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
                "image_url": 'http://thumbs.dreamstime.com/z/hungry-munchies-fast-food-cartoon-illustration-thinking-man-30676401.jpg',
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
                    "title": "Enter your own cuisine",
                    "payload": "OC"
                }
              ]
              }],

          }
      }
  }

module.exports = messageData;
