var IntroViewButton = {
attachment:{
type:"template",
payload:{
  template_type:"button",
  text:"Please Click An Option",
  buttons:[
    {
      type:"postback",
      title:"Get Food Trucks\n Around Your Area",
      payload:"this is Adi"
    },
    {
      type:"postback",
      title:"Search for Specific \nFood Truck",
      payload:"this is Adi"
    },
    {
      type:"postback",
      title:"Food Trucks Open at\n This Hour",
      payload:"this is Adi"
    }
  ]
}
}
};

module.exports = IntroViewButton;
