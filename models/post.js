let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
        writer : {type:String},
        content : {type:String},
        likenumber :{type:Number}
    },{versionKey:false},
    { collection: 'postdb' });

module.exports = mongoose.model('Post', PostSchema);
