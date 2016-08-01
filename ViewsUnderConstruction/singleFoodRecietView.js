var recieptFunc = function(itemName,itemPrice,recipient_name) {

  var recieptTest = {
      attachment: {
          type: "template",
          payload: {
              template_type: "receipt",
              recipient_name: recipient_name,
              order_number: "300",
              currency: "AED",
              payment_method: "credit",
              elements: {
                title: itemName,
                price: itemPrice
              },
              summary: {
                  total_cost: totalPrice
              }
          }
      }
  };
  return recieptTest;
}

module.exports = recieptFunc;
