var _ = require('underscore');
var natural = require('natural');
var request = require('request');

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
var sampleMenuNames = ['egg and cheese sandwitch','bacon egg and cheese sandwitch', 'egg sandwitch'];
var breadOptions = ['bagel','roll','hoagie'];
var AddOns = ['siracha','salt','pepper','ketchup'];

var containsInCollec = function(collection,testItem) {
  var testBool = false;
  for (var i = 0; i < collection.length; i++) {
    if( collection[i].indexOf(testItem) !== -1) {
      testBool = true;
    }
  }
  return testBool;
}

var containsInSampleMenu = containsInCollec.bind(null,sampleMenuNames);
var containsBreadOptions = containsInCollec.bind(null,breadOptions);
var containsAddOns = containsInCollec.bind(null,AddOns);

var stringDistanceInCollec = function(collection,testItem) {
  var highestDistance = 0;
  for (var i = 0; i < collection.length; i++) {
    var dist = natural.JaroWinklerDistance(collection[i],testItem);
    if(dist > highestDistance) {
      highestDistance = dist;
    }

  }

  return highestDistance;
}

var distMenu =  stringDistanceInCollec.bind(null,sampleMenuNames);
var distBread = stringDistanceInCollec.bind(null,breadOptions);
var distAddOns = stringDistanceInCollec.bind(null,AddOns);


var eliminateFillers = function(text) {
  return  text != 'I' && text != 'want' && text != 'a' &&
text != 'Please' && text != 'please' && text != 'on';


}

var tokenizer = new natural.WordTokenizer();

var processText = function(text) {
  var lowerCase = text.toLowerCase();

  var wordArr = tokenizer.tokenize(lowerCase);
  var goodWordArr = _.filter(wordArr,eliminateFillers);
  //console.log(goodWordArr);
  //create empty object
  var wordCategoryMap = [];
  var createObj = function(element, index, arr) {
    wordCategoryMap.push({word:element, category: ''});
  }
  goodWordArr.forEach(createObj);
  //contains test.

  var containsObj = function(element, index,arr) {
    if(containsInSampleMenu(element.word)) {
      element.category = 'MainDish';
    } else if(containsBreadOptions(element.word)) {
      element.category = 'Bread';
    } else if(containsAddOns(element.word)) {
      element.category = 'AddOn';
    }
  }
  wordCategoryMap.forEach(containsObj);

//grouping
  var group = function(list) {
    var returnlist = [];
    var prev = '';
    for (var i = 0; i < list.length; i++) {
      if(list[i].category === prev) {
        var size = returnlist.length -1;
        var prevWord = returnlist[size].word;
        returnlist[returnlist.length -1] = {word:prevWord + ' ' + list[i].word, category: list[i].category};
      } else {
        prev = list[i].category;
        returnlist.push(list[i]);
      }
    }
    return returnlist;
  }

  var singleCategoryMap = group(wordCategoryMap);

//string distance

var stringDistObj = function(ele,index,arr) {
  if(ele.category === '') {
    var menu = distMenu(ele.word);
    var bread = distBread(ele.word);
    var addOn = distAddOns(ele.word);
    if(menu>bread && menu> addOn) {
      ele.category = 'MainDish';
    } else if(bread>menu && bread> addOn) {
      ele.category = 'Bread';
    } else {
      ele.category = 'AddOn';
    }
  }

}

singleCategoryMap.forEach(stringDistObj);

//group round 2

var singleCategoryMap2 = group(singleCategoryMap);
//console.log(singleCategoryMap2);






};

//processText('Egg and Cheeze on a roll');
 var classifier = new natural.BayesClassifier();



//console.log(natural.JaroWinklerDistance('egg and cheese sandwitch','cheeze'));

/*things to do:
  Stripe pending Bank Account
  Upgrade everything
  Populate mongodb

*/
