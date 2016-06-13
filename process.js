
$('.button').click(function(){

var nameVal = $('.name').val();
var hours = $('.hour').val();
var html = 'Name: ' + nameVal + ', Hours: ' + hours + '\n';

$('.name').val('');
$('.hour').val('');

qwest.post(('https://testmessenger5.herokuapp.com/read'), {
  'text' : html
}).then(function () {
  console.log('yes baby');
})



})
