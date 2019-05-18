var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: Number,
    username: String,
    full_name: String,
    bio: String,
    website: String,
    profile_picture: String,
    access_token: String,
    skole: String,
    elevated: Boolean,
},{
    collection:'User'
});
userSchema.index({username: 'text', full_name: 'text', bio: 'text'});
module.exports = mongoose.model('User', userSchema);