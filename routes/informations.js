import Information from '../models/informations';
import Users from '../models/users';
import Message from '../models/message';
import express from 'express';
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

    Information.find(function(err, informations) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(informations,null,5));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Information.find({ "_id" : req.params.id },function(err, information) {
        if (err)
            res.json({ message: 'Information NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(information,null,5));
    });
}
router.findfromtables = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Information.aggregate([
        {
            $lookup:{
            from:"messages",
            localField: "username",
            foreignField:"sender",
            as:"messageowner"
            }
        },
        {
            $lookup:{
            from:"users",
            localField: "username",
            foreignField:"username",
            as:"users' information"
            }
        }
        ],function (err,informations) {

        if (err) {
            res.json({errmsg: err});
        } else {
            res.send(JSON.stringify(informations, null, 5));
        }
    });
}

router.fuzzy = (req, res) =>{
    var key = req.params.key;
    var whereStr = {$or:[
            //{id:{$regex:key}},
            {username:{$regex:key,$options: '$i'}},
            {sex:{$regex:key, $options: '$i'}},
        ]}

    Information.find(whereStr, function (err, information) {
        if (err) {
            res.json({ message: 'Information NOT Found!', errmsg : err } );
        } else {
            res.send(JSON.stringify(information,null,5));
        }
    })
}
function getTotalaom(array) {
    let totalaom = 0;
    array.forEach(function(obj) { totalaom += obj.amountofmessage; });
    return totalaom;
}

router.addInformation = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var information = new Information();
    information.id = req.body.id;
    information.username = req.body.username;
    information.sex = req.body.sex;

    information.save(function(err) {
        if (err)
            res.json({ message: 'Information NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Information Successfully Added!', data: information });
    });
}

router.incrementaom = (req, res) => {

    Information.findOne({"username":req.params.username}, function(err,information) {
        if (err)
            res.json({ message: 'Information NOT Found!', errmsg : err } );
        else {
            information.amountofmessage += 1;
            information.save(function (err) {
                if (err)
                    res.json({ message: 'Information NOT Increased!', errmsg : err } );
                else
                    res.json({ message: 'Information Successfully Increased!', data: information });
            });
        }
    });
}

router.deleteInformation = (req, res) => {

    Information.findOneAndRemove({"username":req.params.username}, function(err) {
        if (err)
            res.json({ message: 'Information NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Information Successfully Deleted!'});
    });
}
router.deleteAll = (req, res) => {

    Information.remove({}, function(err) {
        if (err)
            res.json({ message: 'Information NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'All of Information Successfully Deleted!'});
    });
}


router.findTotalaom = (req, res) => {

    Information.find(function(err, informations) {
        if (err)
            res.send(err);
        else
            res.json({ totalmessages : getTotalaom(informations) });
    });
}

module.exports = router;
