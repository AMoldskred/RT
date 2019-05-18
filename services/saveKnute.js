const async = require('async');
const mongoose = require('mongoose');
//Minifiers
const path = require("path")
const fs = require('fs');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminMozjpeg = require('imagemin-mozjpeg');
const Follow = require('../models/Follow');
const Post = require('../models/Post');
const Feed = require('../models/Feed');

function savePost(body, req){
    return new Promise((resolve,reject)=> {
        async.waterfall([
            function (callback) {
                if(body.shareable === false){
                    callback(null, {})
                }else {
                    let base64Data = body.img.replace(/^data:image\/jpeg;base64,/, "");

                    const filename = String(body.creator + (new Date().getTime()));
                    console.log("Filename:", filename);
                    fs.writeFile(path.join(__dirname, '../images', `/temp/${filename}.jpeg`), base64Data, {
                        encoding: 'base64',
                        flag: 'w'
                    }, function (err) {
                        if (err) return reject(err);
                        console.log("PATH:", path.join(__dirname, '../images', `/temp/${filename}.jpeg`))
                        imagemin([path.join(__dirname, '../images', `/temp/${filename}.jpeg`)], path.join(__dirname, '../images'), {use: [imageminJpegtran({progressive: true})]}).then(() => {
                            imagemin([path.join(__dirname, '../images', `/temp/${filename}.jpeg`)], path.join(__dirname, '../images', `/min/`), {use: [imageminMozjpeg({quality: 25})]}).then(() => {
                                fs.unlink(path.join(__dirname, '../images', `/temp/${filename}.jpeg`), (err) => {
                                    callback(null, {
                                        full: `/images/${filename}.jpeg`,
                                        min: `/images/min/${filename}.jpeg`
                                    })
                                })
                            });
                        }).catch(err => console.log(err))
                    });
                }
            },
            function (images, callback) {
                // find followers of post creator
                Follow.find({leader_id: mongoose.mongo.ObjectID(req.session.user._id)})
                    .exec(function (err, followers) {
                        if (err) {
                            console.log(err)
                            return reject({error: true, err: err});
                        }
                        callback(null, followers, images);
                    });

            },
            function (followers, images, callback) {
                // saving the post
                let post = new Post({
                    creator: mongoose.mongo.ObjectID(req.session.user._id),
                    body: {
                        img:  body.shareable === false ? '/images/constant/knute.png' : images.full,
                        minified: body.shareable === false ? '/images/constant/knute.png' : images.min,
                        knuteTitle: body.title,
                        knuteId: Number(body.id),
                        profile_picture: req.session.user.profile_picture,
                        user: req.session.user.username,
                        description: body.description,
                    },
                });
                console.log("Post: ", post.creator)
                post.save(function (err, post) {
                    if (err) {
                        console.log(err)
                        return reject({error: true, err: err});
                    }
                    if (!err && post) {
                        followers.forEach((follower) => {
                            console.log("Creating post for:",follower.follow_id)
                            new Feed({
                                created_by: mongoose.mongo.ObjectID(req.session.user._id),
                                user_id: mongoose.mongo.ObjectID(follower.follow_id),
                                post_id: mongoose.mongo.ObjectID(post._id),
                            }).save();
                        });
                        new Feed({
                            user_id: mongoose.mongo.ObjectID(req.session.user._id),
                            created_by: mongoose.mongo.ObjectID(req.session.user._id),
                            post_id: mongoose.mongo.ObjectID(post._id),
                        }).save();
                        callback(null, post);
                    }
                });
            }
        ], function (err, result) {
            if (err) return reject({error: true, err: err});
            if (!err && result) {
                return resolve({success: true, res: result});
            }
        });
    })
}
module.exports = savePost;