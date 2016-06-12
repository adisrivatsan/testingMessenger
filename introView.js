var IntroViewButton = {
attachment:{
type:"template",
payload:{
  template_type:"button",
  text:"Please Click an Option",
  buttons:[
    {
      type:"postback",
      title:"Get food trucks around your area",
      payload:"this is Adi"
    },
    {
      type:"postback",
      title:"Search for Specific Food Truck",
      payload:"this is Adi"
    },
    {
      type:"postback",
      title:"Food trucks Open at This hour",
      payload:"this is Adi"
    }
  ]
}
}
};

module.exports = IntroViewButton; 
