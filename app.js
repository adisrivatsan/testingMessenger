var express = require("express");
 var app = express();
 var port = process.env.PORT || 3000;
 app.get("/", function (req,res) {
 	res.sendFile(__dirname + '/index.html');
 })


 app.listen(port);
 console.log("listening on port " + port);
