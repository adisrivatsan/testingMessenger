var messageData = {
      "attachment": {
          "type": "template",
          "payload": {
              "template_type": "generic",
              "elements": [{
                  "title": 'What would you like Today?',
                  "subtitle": "Click to see our options",
                  "image_url": 'http://thumbs.dreamstime.com/z/hungry-munchies-fast-food-cartoon-illustration-thinking-man-30676401.jpg',
                  "buttons": [{
                      "type": "postback",
                      "title": "Food Trucks In Area",
                      "payload":"Area"
                  }, {
                      "type": "postback",
                      "title": "Sort By Cuisine",
                      "payload": "Cuisine"
                  }, {
                      "type": "postback",
                      "title": "Open Food Trucks",
                      "payload": "Open"
                  }],
              }, {
                "title": "Continue",
                "subtitle": "hello",
                "image_url": 'http://wp.streetwise.co/wp-content/uploads//2014/09/unnamed-213.jpg',
                "buttons": [{
                    "type": "postback",
                    "title": "Best Quality",
                    "payload":"BQuality"
                }, {
                    "type": "postback",
                    "title": "Shortest Line",
                    "payload": "SLine"
                }, {
                    "type": "postback",
                    "title": "Bang for your buck",
                    "payload": "BBuck"
                }]
              }],

          }
      }
  }

module.exports = messageData;
