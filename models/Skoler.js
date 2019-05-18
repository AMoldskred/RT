var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skoleSchema = new Schema(
    {
       "skole": {type: String, required:true}
    },{
        collection:'Skole'
    });

var Skole = module.exports = mongoose.model('Skole', skoleSchema);