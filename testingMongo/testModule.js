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

var testSet = new Set();
testSet.add(1);
testSet.add(2);
testSet.add(3);
testSet.add(1);
var iterator = Array.from(testSet);
console.log(iterator);




//console.log(templateFilter(5,'LineLength',collession));
