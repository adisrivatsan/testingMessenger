var express = require("express");
 var app = express();
 var port = process.env.PORT || 3000;
 app.use(express.static(__dirname));


 app.get("/", function (req,res) {
 	res.sendFile(__dirname + '/index.html');
 })

 app.get('/webhook/', function (req, res) {
   if (req.query['hub.verify_token'] === '<validation_token>') {
     res.send(req.query['hub.challenge']);
   }
   res.send('Error, wrong validation token');
 })


 app.listen(port);
 console.log("listening on port " + port);
