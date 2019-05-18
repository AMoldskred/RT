var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var followSchema = new Schema(
    {
        follow_id: { type: Schema.Types.ObjectId, required: true, ref: 'User'  },
        leader_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
    },{
        collection:'Follow'
    });

var Follow = module.exports = mongoose.model('Follow', followSchema);