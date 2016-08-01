var request = require('request');

var buttonTest = {
    attachment: {
        type: "template",
        payload: {
            template_type: "button",
            text: "What do you want to do next?",
            buttons: [{
                type: "web_url",
                url: "https://petersapparel.parseapp.com",
                title: "Show Website"
            }, {
                type: "postback",
                title: "Start Chatting",
                payload: "this is Adi"
            }]
        }
    }
};

var imageTest = {
    attachment: {
        type: "image",
        payload: {
            url: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Moraine_Lake_17092005.jpg"
        }
    }
}

var recieptTest = {
    attachment: {
        type: "template",
        payload: {
            template_type: "receipt",
            recipient_name: "Aditya",
            order_number: "300",
            currency: "AED",
            payment_method: "credit",
            elements: [{
                title: "one",
                price: 5
            }, {
                title: "two",
                price: 10
            }],
            summary: {
                total_cost: 30
            }
        }
    }
};

var welcomeMessage = function() {
    var options = {
        url: 'https://graph.facebook.com/v2.6/1768741990005872/thread_settings?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
        method: 'POST',
        setting_type: "call_to_actions",
        thread_state: "new_thread",
        call_to_actions: [{
            message: {
                text: "Welcome to My Company!"
            }
        }]
    }
    request(options, function(error, body, response) {
        console.log(error);
    })
}var buttonTest = {
    attachment: {
        type: "template",
        payload: {
            template_type: "button",
            text: "What do you want to do next?",
            buttons: [{
                type: "web_url",
                url: "https://petersapparel.parseapp.com",
                title: "Show Website"
            }, {
                type: "postback",
                title: "Start Chatting",
                payload: "this is Adi"
            }]
        }
    }
};

var imageTest = {
    attachment: {
        type: "image",
        payload: {
            url: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Moraine_Lake_17092005.jpg"
        }
    }
}

var recieptTest = {
    attachment: {
        type: "template",
        payload: {
            template_type: "receipt",
            recipient_name: "Aditya",
            order_number: "300",
            currency: "AED",
            payment_method: "credit",
            elements: [{
                title: "one",
                price: 5
            }, {
                title: "two",
                price: 10
            }],
            summary: {
                total_cost: 30
            }
        }
    }
};

var welcomeMessage = function() {
    var options = {
        url: 'https://graph.facebook.com/v2.6/1768741990005872/thread_settings?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
        method: 'POST',
        setting_type: "call_to_actions",
        thread_state: "new_thread",
        call_to_actions: [{
            message: {
                text: "Welcome to My Company!"
            }
        }]
    }
    request(options, function(error, body, response) {
        console.log(error);
    })
}var buttonTest = {
    attachment: {
        type: "template",
        payload: {
            template_type: "button",
            text: "What do you want to do next?",
            buttons: [{
                type: "web_url",
                url: "https://petersapparel.parseapp.com",
                title: "Show Website"
            }, {
                type: "postback",
                title: "Start Chatting",
                payload: "this is Adi"
            }]
        }
    }
};

var imageTest = {
    attachment: {
        type: "image",
        payload: {
            url: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Moraine_Lake_17092005.jpg"
        }
    }
}

var recieptTest = {
    attachment: {
        type: "template",
        payload: {
            template_type: "receipt",
            recipient_name: "Aditya",
            order_number: "300",
            currency: "AED",
            payment_method: "credit",
            elements: [{
                title: "one",
                price: 5
            }, {
                title: "two",
                price: 10
            }],
            summary: {
                total_cost: 30
            }
        }
    }
};

var welcomeMessage = function() {
    var options = {
        url: 'https://graph.facebook.com/v2.6/1768741990005872/thread_settings?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
        method: 'POST',
        setting_type: "call_to_actions",
        thread_state: "new_thread",
        call_to_actions: [{
            message: {
                text: "Welcome to My Company!"
            }
        }]
    }
    request(options, function(error, body, response) {
        console.log(error);
    })
}var buttonTest = {
    attachment: {
        type: "template",
        payload: {
            template_type: "button",
            text: "What do you want to do next?",
            buttons: [{
                type: "web_url",
                url: "https://petersapparel.parseapp.com",
                title: "Show Website"
            }, {
                type: "postback",
                title: "Start Chatting",
                payload: "this is Adi"
            }]
        }
    }
};

var imageTest = {
    attachment: {
        type: "image",
        payload: {
            url: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Moraine_Lake_17092005.jpg"
        }
    }
}

var recieptTest = {
    attachment: {
        type: "template",
        payload: {
            template_type: "receipt",
            recipient_name: "Aditya",
            order_number: "300",
            currency: "AED",
            payment_method: "credit",
            elements: [{
                title: "one",
                price: 5
            }, {
                title: "two",
                price: 10
            }],
            summary: {
                total_cost: 30
            }
        }
    }
};

var welcomeMessage = function() {
    var options = {
        url: 'https://graph.facebook.com/v2.6/1768741990005872/thread_settings?access_token=EAADwfLzJvdoBAHCy4whhMSmljNMKZBWt1q785KOLcQcAOKCWRc0qaiGnCm4t8bSwYxVwMtDP5owoKiA1QjtKT2ZBdg9jx1yBRnDYhBD2nB0B0XSzIOaQQ4krjxm20VaQZAwb0LRTPZCS2H54DPK8XINYwHhF4lok1cVr5Yr3fAZDZD',
        method: 'POST',
        setting_type: "call_to_actions",
        thread_state: "new_thread",
        call_to_actions: [{
            message: {
                text: "Welcome to My Company!"
            }
        }]
    }
    request(options, function(error, body, response) {
        console.log(error);
    })
}
