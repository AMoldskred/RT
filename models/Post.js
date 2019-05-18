var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    body: {
        img: {type: String , required:true},
        minified: {type: String , required:true},
        profile_picture: {type: String , required:true},
        knuteTitle: {type: String , required:true},
        knuteId: {type: Number , required:true},
        user: {type: String , required:true},
        description: {type:String, required: true}
    },
    created_at :{type:Date , default:Date.now}
},{
    collection:'Post'
});

var Post = module.exports = mongoose.model('Post', postSchema);