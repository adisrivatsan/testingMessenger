
var recieptFunc = function(menuItems,recipient_name) {
  var food = [];
  var totalPrice = 0;
  var getFood = function() {
    for (var i = 0; i < menuItems.length; i++) {

      var sampleObj = {
        title: menuItems[i].Name,
        price: menuItems[i].Price
      }
      totalPrice = totalPrice + menuItems[i].Price;
      food.push(Object.assign({},sampleObj));
    }
  }
  getFood();

  var recieptTest = {
      attachment: {
          type: "template",
          payload: {
              template_type: "receipt",
              recipient_name: recipient_name,
              order_number: "300",
              currency: "AED",
              payment_method: "credit",
              elements: [food],
              summary: {
                  total_cost: totalPrice
              }
          }
      }
  };
  return recieptTest; 
}

module.exports = recieptFunc;
