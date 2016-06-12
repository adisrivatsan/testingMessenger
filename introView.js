var IntroViewButton = {
attachment:{
type:"template",
payload:{
  template_type:"button",
  text:"Please Click An Option",
  buttons:[
    {
      type:"postback",
      title:"Food Trucks In Area",
      payload:"this is Adi"
    },
    {
      type:"postback",
      title:"Specific Food Truck",
      payload:"this is Adi"
    },
    {
      type:"postback",
      title:"Open Food Trucks",
      payload:"this is Adi"
    }
  ]
}
}
};

module.exports = IntroViewButton;
