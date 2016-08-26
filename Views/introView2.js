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
                      "title": "Food Trucks",
                      "payload":"TRated"
                  }, {
                      "type": "postback",
                      "title": "Restaurants",
                      "payload": "SLine"
                  }],
              } /*{
                "title": "Food Type",
                "image_url": 'http://www.ezyhealth.com/magazine/wp-content/uploads/2015/03/iStock_000046272610_Large.jpg',
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
            } */],

          }
      }
  }

module.exports = messageData;
