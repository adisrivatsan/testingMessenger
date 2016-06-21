var messageData = {
      "attachment": {
          "type": "template",
          "payload": {
              "template_type": "generic",
              "elements": [{
                  "title": 'What would you like Today?',
                  "subtitle": "Click to see our options",
                  "image_url": 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwj11dzSgbjNAhWKcj4KHZ30D6wQjRwIBw&url=http%3A%2F%2Fwww.123rf.com%2Fclipart-vector%2Fhungry.html&bvm=bv.124817099,d.cWw&psig=AFQjCNFn5iTUMn42fMxsYJm1JHwYnPZ3bA&ust=1466560460683106',
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

module.exports = IntroViewButton;
