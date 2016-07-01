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
                }]
              }],

          }
      }
  }

module.exports = messageData;
