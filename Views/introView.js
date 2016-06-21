var messageData = {
      "attachment": {
          "type": "template",
          "payload": {
              "template_type": "generic",
              "elements": [{
                  "title": 'What would you like Today?',
                  "subtitle": "Click to see our options",
                  "image_url": 'http://previews.123rf.com/images/gnicolson/gnicolson1206/gnicolson120600005/14133749-hungry-man-thinking-of-food-Stock-Vector-eating.jpg',
                  "buttons": [{
                      "type": "postback",
                      "title": "Food Trucks In Area",
                      "payload":"Area"
                  }, {
                      "type": "postback",
                      "title": "Cuisine Food Truck",
                      "payload": "Cuisine"
                  }, {
                      "type": "postback",
                      "title": "Open Food Trucks",
                      "payload": "Open"
                  }],
              }],

          }
      }
  }

module.exports = messageData;
