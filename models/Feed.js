var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, refer:'User' , required:true},
    created_by: {type: Schema.Types.ObjectId, refer:'User' , required:true},
    post_id: {type: Schema.Types.ObjectId, refer:'Post' , required:true},
},{
    collection:'Feed'
});

var Feed = module.exports = mongoose.model('Feed', feedSchema);