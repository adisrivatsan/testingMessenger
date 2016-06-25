var fs = require('fs');
var str = fs.readFileSync("./PagePicture/foo.html","utf-8");

var convert = require('./testConvert');


var resName = [{
  Name: 'Pizza',
  Price: 43
}, {
  Name: 'Lettuce',
  Price:30
}, {
  Name: 'Mango',
  Price: 12
}];

var writeToHtml = function (NameOfRes, arr,callback) {
  var len = arr.length;
  var withName = addName(str,'Trivano');
  var diff = withName.split("'item'>");
  var total = '';
  //console.log(diff[0]);
  for (var i = 0; i < arr.length; i++) {
    total =  total+ diff[i] + "'item'>\n" + arr[i].Name + ', Price:'+ arr[i].Price;
  }
  for (var i = len; i <diff.length; i++) {
    if(i==len) {
      total = total + diff[i];
    } else {
      total = total + "'item'>" +diff[i];
    }

  }
  fs.writeFileSync("other.html",total);

  callback('other.html');




}

//console.log(first);
var addName = function(htmlString,Name) {

  var splitArr = str.split("class='start'>");
  var combine = splitArr[0] + "class='start'>\n" +  Name + '\n' + splitArr[1];
  return combine;
  //console.log(combine);
  //fs.writeFileSync("other.html", combine);
}

writeToHtml('Trivano',resName,convert);
module.exports = writeToHtml;
