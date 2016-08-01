var imageTest = function(givenUrl) {
    var message = {
      attachment: {
        type: "image",
        payload: {
            url: givenUrl
        }
    }
  }
    return message;
}

module.exports = imageTest;
