let Message = require('../models/message');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var mongodbUri = 'mongodb://WZT:NBNBwzt155@ds139193.mlab.com:39193/heroku_45x9jh4d'
mongoose.connect(mongodbUri);

let db = mongoose.connection;
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ] on mlab.com');
});

router.findAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Message.find(function(err, messages) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(messages,null,5));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Message.find({ "_id" : req.params.id },function(err, message) {
        if (err)
            res.json({ message: 'Message NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(message,null,5));
    });
}

router.fuzzy = (req, res) =>{
    var key = req.params.key;
    var whereStr = {$or:[
            //{_id:{$regex:key}},
            {sender:{$regex:key,$options: '$i'}},
            {content:{$regex:key, $options: '$i'}},
        ]}

    Message.find(whereStr, function (err, message) {
        if (err) {
            res.json({ message: 'Message NOT Found!', errmsg : err } );
        } else {
            res.send(JSON.stringify(message,null,5));
        }
    })
}


router.addMessage = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var message = new Message();
    message.sender = req.body.sender;
    message.content = req.body.content;
    message.save(function(err) {
        if (err)
            res.json({ message: 'Message NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Message sent by '+ req.body.sender+' Successfully Added!', data: message });
    });
}


router.deleteMessage = (req, res) => {

    Message.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Message NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Message Successfully Deleted!'});
    });
}

router.deleteAll = (req, res) => {

    Message.remove({}, function(err) {
        if (err)
            res.json({ message: 'Messages NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'All of the messages Successfully Deleted!'});
    });
}


module.exports = router;