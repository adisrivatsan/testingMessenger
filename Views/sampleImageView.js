var imageTest = function(givenUrl) {
    var message = {
      attachment: {
        type: "image",
        payload: {
            url: givenURl
        }
    }
  }
    return message;
}

module.exports = imageTest;
