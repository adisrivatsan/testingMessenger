var request = require('request');
var html = '<h1> Aditya </h1>';

var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(200, 200)
  , ctx = canvas.getContext('2d');

ctx.font = '30px Impact';
ctx.fillText("Menu", 100, 40);


//var te = ctx.measureText('Aditya!');
//ctx.strokeStyle = 'rgba(0,0,0,0.5)';
//ctx.beginPath();
//ctx.lineTo(50, 102);
//ctx.lineTo(50 + te.width, 102);
//ctx.stroke();

console.log(canvas.toDataURL());
