var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    profilePicture: {type: String, required: true},
    tweets: [{type: Schema.Types.ObjectId, ref: 'Tweets'}]
});

module.exports = mongoose.model('User', schema);