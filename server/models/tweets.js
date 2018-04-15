var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    content: {type: String, required: true,minlength:5,maxlength:150},
    createdOn:{type:Date,default:Date.now()},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.post('remove', function (tweet) {
    User.findById(tweet.user, function (err, user) {
        user.tweets.pull(tweet);
        user.save();
    });
});

module.exports = mongoose.model('Tweets', schema);