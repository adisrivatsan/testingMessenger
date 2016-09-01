
var recieptFunc = function(menuItems,recipient_name) {
  var food = [];
  var totalPrice = 0.0;
  var getFood = function() {
    for (var i = 0; i < menuItems.length; i++) {

      var sampleObj = {
        title: menuItems[i].Name,
        price: menuItems[i].Price,
        image_url:'http://thumbs.dreamstime.com/z/thank-you-choosing-us-banner-design-over-white-background-46977269.jpg'
      }
      totalPrice = totalPrice + menuItems[i].Price;
      food.push(Object.assign({},sampleObj));
    }
    totalPrice = totalPrice + totalPrice*0.029 + 0.3;
  }
  getFood();


  var recieptTest = {
      attachment: {
          type: "template",
          payload: {
              template_type: "receipt",
              recipient_name: recipient_name,
              order_number: "300",
              currency: "USD",
              payment_method: "none",
              elements: food,
              summary: {
                  total_cost: totalPrice
              }
          }
      }
  };
  return recieptTest;
}

module.exports = recieptFunc;
