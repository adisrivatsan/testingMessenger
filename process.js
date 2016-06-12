
$('.button').click(function(){

var nameVal = $('.name').val();
var hours = $('.hour').val();
var html = 'Name: ' + nameVal + ', Hours: ' + hours + '\n';

$('.name').val('');
$('.hour').val('');

$.ajax({
  url: 'http://testmessenger5.herokuapp.com/read',
  context: html
}).done(function(){
    console.log('done baby');
})



})
