const async = require('async');
//Minifiers
const path = require("path")
const fs = require('fs');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Feed = require('../models/Feed');

function deleteKnute(postId){
    return new Promise((resolve,reject)=> {
        async.waterfall([
            function (callback) {
               Post.find({'_id':mongoose.mongo.ObjectID(postId)}).exec((err, post) => {
                   let min = post[0].body.minified;
                   let img = post[0].body.img;
                   if(img === '/images/constant/knute.png'){
                       Post.remove({'_id':mongoose.mongo.ObjectID(postId)}).exec();
                       callback(null,postId)
                   }else{
                       fs.unlink(path.join(__dirname, min), (err) =>{
                           fs.unlink(path.join(__dirname, img), (err) => {
                               Post.remove({'_id':mongoose.mongo.ObjectID(postId)}).exec();
                               callback(null,postId)
                           })
                       })
                   }
               })

            },
            function (postId, callback) {
                // find followers of post creator
                Feed.deleteMany({post_id:mongoose.mongo.ObjectID(postId)})
                    .exec(function (err, followers) {
                        resolve(true)
                    });

            },
        ])
    })
}
module.exports = deleteKnute;