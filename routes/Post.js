let Post = require('../models/post');
let Information = require('../models/informations');
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

    Post.find(function(err, messages) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(messages,null,5));
    });
}


router.editPost = (req,res)=>{
    Post.findById(req.params.id, function(err,post) {
        if (err)
            res.json({ message: "Post NOT Found!", errmsg : err } );
        else {
            post.content = req.body.content;
            post.writer = req.body.writer;
            post.likenumber = req.body.likenumber;
            post.save(function (err) {
                if (err)
                    res.json({ message: "Post Info Location NOT Change!", errmsg : err } );
                else
                    res.json({ message: "Post Info Location Successfully Change!", data: post });
            });
        }
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Post.find({ "_id" : req.params.id },function(err, message) {
        if (err)
            res.json({ message: 'Post NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(message,null,5));
    });
}

router.fuzzy = (req, res) =>{
    var key = req.params.key;
    var whereStr = {$or:[
            //{_id:{$regex:key}},
            {writer:{$regex:key,$options: '$i'}},
            {content:{$regex:key, $options: '$i'}},
        ]}

    Post.find(whereStr, function (err, message) {
        if (err) {
            res.json({ message: 'Post NOT Found!', errmsg : err } );
        } else {
            res.send(JSON.stringify(message,null,5));
        }
    })
}

router.findfromtables = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Post.aggregate([
        {
            $lookup:{
                from:"messages",
                localField: "writer",
                foreignField:"recipient",
                as:"comment"
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

router.increaselike = (req, res) => {

    Post.findOne({"writer":req.params.writer}, function(err,post) {
        if (err)
            res.json({ message: 'Post NOT Found!', errmsg : err } );
        else {
            post.likenumber += 1;
            post.save(function (err) {
                if (err)
                    res.json({ message: 'Post likenumber NOT Increased!', errmsg : err } );
                else
                    res.json({ message: 'Post likenumber Successfully Increased!', data: post });
            });
        }
    });
}
router.addPost = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    var message = new Post();
    message.writer = req.body.writer;
    message.content = req.body.content;
    message.save(function(err) {
        if (err)
            res.json({ message: 'Post NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Post sent by '+ req.body.writer+' Successfully Added!', data: message });
    });


}


router.deletePost = (req, res) => {

    Post.findOneAndRemove({"writer":req.params.writer}, function(err) {
        if (err)
            res.json({ message: 'Post NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Post Successfully Deleted!'});
    });
}

router.deleteAll = (req, res) => {

    Post.remove({}, function(err) {
        if (err)
            res.json({ message: 'Post NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'All of the Posts Successfully Deleted!'});
    });
}

router.findlikenumber = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Post.aggregate([
        //{$match: {"sender":"wzt"}},
        {$group: {
                "_id": "$sender",
                "count": {$sum: 1}}
        }],function (err,Posts) {

        if (err) {
            res.json({errmsg: err});
        } else {
            res.send(JSON.stringify(Posts, null, 5));

        }
    });

    //res.json({ message: 'Message Successfully Deleted!'});
}

module.exports = router;
