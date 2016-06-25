var wkhtmltox = require("wkhtmltox");
var fs = require('fs');
var converter = new wkhtmltox();

// Convert to image.
// Function takes (inputStream, optionsObject), returns outputStream.

var convert =  function (html) {
  converter.image(fs.createReadStream(html), { format: "jpg" })
    .pipe(fs.createWriteStream("foo.jpg"))
    .on("finish", function() {
      console.log('yay');
      return;
    });
  }

  module.exports = convert;
