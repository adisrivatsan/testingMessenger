
$('.button').click(function(){

var nameVal = $('.name').val();
var hours = $('.hour').val();
var html = '<p> Name: ' + nameVal + '</p>\n<p>Hours: ' + hours + '</p>';

$('.name').val('');
$('.hour').val('');

$('.render').append(html);

})
