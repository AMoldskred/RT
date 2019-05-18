var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Knute = new Schema({
    id: {type: Number , required:true},
    title: {type: String , required:true},
    description: {type: String , required:true},
    lokal: {
        skole:{type: String, required:false}
    },
    shareable: {type: Boolean, default: true}
},{
    collection:'Knute'
});

module.exports = mongoose.model('Knute', Knute);