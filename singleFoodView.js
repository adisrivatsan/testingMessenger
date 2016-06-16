var singleFoodTruck = function(name,image) {
  attachment:{
  type:"template",
  payload:{
    template_type:"button",
    text:name,
    buttons:[
      {
        type:"postback",
        title:"Menu",
        payload:"this is Adi"
      },
      {
        type:"postback",
        title:"Order",
        payload:"this is Adi"
      }
    ]
  }
  }
  };

}
