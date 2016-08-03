var _ = require('underscore');

var vendorInfo = [];
var requestVendorInfo = function() {
  request.get('https://docs.google.com/document/d/1pDM5yUhNXp0-4JzrN-q68n9cv0rfO26RPfsoBiUTNNU/edit',function(error,res,body) {
      //var lines = body.split('\n');
      var content ='';
      var reg = new RegExp('.*<meta property="og:description" content=(.*)<meta name="google" content="notranslate">.*');
      var myArray = reg.exec(body);

      var lines = myArray[1].split('\t');
      //console.log(lines);
      var holder = [];
      var nameReg = new RegExp('N: (.*) H: (.*)');
      for(var i =0; i<lines.length; i++) {
        //console.log(lines[i]);
        var arr3 = nameReg.exec(lines[i]);
        var name2 = arr3[1];
        var hours2 = arr3[2];
        var tempObj = {
          name: name2,
          hours: hours2
        };
        holder.push(Object.assign({},tempObj));
      }
      console.log(holder);
  })

}

var testString = 'hi this is Aditya';
console.log(testString.split(' '));
console.log(testString);

/*
if(chosenFoodTruck) {
  var itemMenu = _.map(chosenFoodTruck.Menu,function(ele) {
    return getItemGivenID(item,ele);
  })
  var repeatCategory = _.map(itemMenu,function(ele) {
    return ele.Category;
  })
  var uniqCategory = _.uniq(repeatCategory);
//  sendTextMessage(sender,'hello' + uniqCategory);
  var bundle = imageView(chosenFoodTruck.MenuUrl);


//console.log(templateFilter(5,'LineLength',collession));
