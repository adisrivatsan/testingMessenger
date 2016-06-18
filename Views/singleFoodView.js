var singleFoodTruck = function(name, imageURL) {
    var image = {
        attachment: {
            type: "image",
            payload: {
                url: imageURL
            }
        }
    }
    var button =
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: name,
                buttons: [{
                    type: "postback",
                    title: "Menu",
                    payload: "this is Adi"
                }, {
                    type: "postback",
                    title: "Order",
                    payload: "this is Adi"
                }]
            }
        }
    var bundle = [image,button];
    return bundle;
};
module.exports = singleFoodTruck; 
