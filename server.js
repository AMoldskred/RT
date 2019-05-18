const express = require('express');
const app = express();
const path = require("path");
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('cookie-session');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017');
app.use(morgan('dev'));



const config = require('./config');
const authUser = require('./services/authService.js');

app.use(bodyParser.json({limit: '20mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));

app.use(session({
    name: 'session',
    keys: ['RT2019', 'RTKEY2019','2019RT'],
    // Cookie Options
    maxAge: 60 * 24 * 60 * 60 * 1000 // 24 hours
}));

//Models
const Follow = require('./models/Follow');
const Post = require('./models/Post');
const User = require('./models/User');
const Feed = require('./models/Feed');
const Knute = require('./models/Knute');
const Skole = require('./models/Skoler');


//Knute process
app.post('/api/createknute', function(req,res){
    const body = req.body; // -> img, title, id
    if( body.title && body.description){
        Knute.find().sort({_id:-1}).limit(1).exec(function (err, knute) {
            if (err) return res.json({error: true})
            console.log(knute)
            let new_knute = new Knute({
                id: knute[0] ? Number(knute[0].id)+1 : 1,
                title: body.title,
                description: body.description,
                shareable: body.shareable === false ? false : true,
            });
            new_knute.save(function (err) {
                if (err) return res.json({error: error});
                // saved!
                res.json({success: true});
            });
        })
    }else{
        return res.json({error:'Missing query'})
    }
});
app.post('/api/createlokalknute', function(req,res){
    const body = req.body; // ->  title, id, description, shareable
    if(body.title && body.description){
        Knute.find().sort({_id:-1}).limit(1).exec(function (err, knute) {
            if (err) return res.json({error: true})
            let new_knute = new Knute({
                id: knute[0] ? Number(knute[0].id)+1 : 1,
                title: body.title,
                description: body.description,
                shareable: body.shareable === false ? false : true,
                lokal: {
                    skole: body.skole,
                }
            });
            new_knute.save(function (err) {
                if (err) return res.json({error: error});
                // saved!
                res.json({success: true});
            });
        })
    }else{
        return res.json({error:'Missing query'})
    }
});
app.get('/api/knuter/', function(req,res) {
    const lim = req.query.limit ? Number(req.query.limit) : 10;
    const off = req.query.offset ? Number(req.query.offset) : 0;
    Knute.find({"lokal.skole": null})
        .limit(lim)
        .skip(off)
        .exec(function (err, knuter) {
            if (err) return res.json({error: true})
            res.json({knuter: knuter})
        })
});
app.get('/api/knuter/skole', function(req,res){
    if(!req.session.user) return res.json({knuter:null});
    if(!req.session.user.skole) return res.json({knuter:false});
    let skole = req.session.user.skole;
    console.log(skole)
        Knute.find({"lokal.skole":skole}).exec(function(err, lokalknuter){
            if(err) return res.json({error:true})
           res.json({knuter:lokalknuter})
        })
});
app.get('/api/knute/:id', function(req,res){
    Knute.find({id:req.params.id}).exec(function(err, knute){
        if(err) return res.json({error:true})
        res.json({knute: knute})
    })
});
app.get('/api/joinlokalskole/:skole', function(req,res){
    let skole = req.params.skole;
    User.updateOne(
        { _id: req.session.user._id },
        {$set: { 'skole': skole}}
    , (err,updatedUser) => {
        if(err) return res.json({error:err});
        req.session.user.skole = skole;
        res.json({success:true})
    });


});
app.get('/api/skoler', function(req,res){
    Skole.find({}).exec((err, skoler) => {
        res.json({
            skoler:skoler,
            sattskole:req.session.user.skole ? req.session.user.skole : '',
        })
    })
});
app.get('/api/createskole/:skole', function (req,res) {
    new Skole({skole:req.params.skole}).save();
    return res.json({success:true})
});
//Auth process
    app.get('/api/ping', function(req,res){
        if (req.session.user) {
            return res.json({login: true})
        }
        res.json({login:false})
    });
    app.get('/api/auth', authUser);
    app.get('/api/login', function (request, response) {
        response.redirect(config.instagram.auth_url);
    });
    app.get('/api/logout', function (req, res) {
        if (req.session) {
            // delete session object
            req.session = null;
            res.redirect('/')
        }
    });

//API handling
    app.get('/api/profile',function (req, res) {
        Post.find({creator: mongoose.mongo.ObjectID(req.session.user._id)})
            .exec(function(error, posts){
                if(error) return res.json({error:true});
                return res.json({
                    posts: posts,
                    user: {_id: req.session.user._id, username: req.session.user.username, full_name: req.session.user.full_name, profile_picture: req.session.user.profile_picture}
                })
            })
    });
    //Get specific user
    app.get('/api/profile/:id', function(req,res){
        User.find({_id: req.params.id})
            .exec(function(err, usr){
                if(err) return res.json({error:true});
                let user = usr[0];
                Post.find({creator: mongoose.mongo.ObjectID(req.params.id)})
                    .exec(function(error, posts){
                        if(error) return res.json({error:true});
                        return res.json({
                            posts: posts,
                            user: {_id: user._id, username: user.username, full_name: user.full_name, profile_picture: user.profile_picture}
                        })
                    })
            })
    });
    //Get single post
    app.get('/api/post/:id',function (req, res) {
        let id = decodeURIComponent(req.params.id);
        Post.find({_id:mongoose.mongo.ObjectID(id)}).exec(function(err,post){
                if(!err && post){
                    return res.json({post:post[0]});
                }else{
                    return res.json({post:{}});
                }
            });
    });
    //Has person done this knute?
    app.get('/api/isdone/:id', function (req,res) {
        let id = req.params.id;
        if(!req.session.user)return res.json({done:null});
        Post.find({"creator": mongoose.mongo.ObjectID(req.session.user._id),"body.knuteId":id}).exec(function(err,done){
            if(!err && (done.length < 1)){
                return res.json({done:false});
            }else{

                return res.json({done:true});
            }
        });

    });
    //Search system
    app.get('/api/search/:q',function (req, res) {
        let q = decodeURIComponent(req.params.q);
        User.find({$text: {$search: q}}, {score: {$meta: 'textScore'}}).sort({score: {$meta: 'textScore'}})
            .exec(function(err,users){

                if(!err && users){
                    let list = users.map((user) => {return {_id: user._id, username: user.username, full_name: user.full_name, profile_picture: user.profile_picture,}})
                    return res.json({users:list});
                }else{
                    return res.json({users:[]});
                }
            });
    });
    //Follow system
        /* Get people you follow */
        app.get('/api/following',function (req, res) {
            const userid = req.session.user._id;
            Follow.find({follow_id:mongoose.mongo.ObjectID(userid)})
                .populate('leader_id')
                .exec(function(err,followings){
                    if(!err && followings){
                        return res.json({followings:followings});
                    }
                });
        });
        /* Get specific person you follow */
        app.get('/api/following/:id',function (req, res) {
            const userid = req.session.user._id;
            Follow.find({follow_id:mongoose.mongo.ObjectID(userid), leader_id:mongoose.mongo.ObjectID(req.params.id)})
                .exec(function(err,followings){
                    if(!err && followings){
                        if(followings.length < 1) return res.json({follow:false});
                        return res.json({follow:true});
                    }
                    res.json({follow:false});
                });
        });

        /* Get people who follow you */
        app.get('/api/followers',function (req, res) {
            const userid = req.session.user._id;
            Follow.find({leader_id:mongoose.mongo.ObjectID(userid)})
                .exec(function(err,followers){
                    if(!err && followers){
                        return res.json({followers:followers});
                    }
                });
        });
        /* Follow person */
        // params: { follow_id: *THE ID OF PERSON TO FOLLOW* }
        app.post('/api/follow/:follow_id', function(req,res){
           let new_follow = new Follow({
                follow_id: mongoose.mongo.ObjectID(req.session.user._id),
                leader_id: mongoose.mongo.ObjectID(req.params.follow_id),
            });
            new_follow.save(function (err) {
                if (err) return res.json({error: error});
                // saved!
                res.json({success: true});
            });
            Post.find({creator: mongoose.mongo.ObjectID(req.params.follow_id)})
                .exec(function(err,posts){
                    posts.forEach((p) => {
                        new Feed({
                            user_id: mongoose.mongo.ObjectID(req.session.user._id),
                            created_by:mongoose.mongo.ObjectID(req.params.follow_id),
                            post_id: mongoose.mongo.ObjectID(p._id),
                        }).save();
                    })
                })
        });
        /* Unfollow person */
        app.post('/api/unfollow/:follow_id', function(req,res){
           Follow.deleteOne({
               follow_id: mongoose.mongo.ObjectID(req.session.user._id),
               leader_id: mongoose.mongo.ObjectID(req.params.follow_id),
           }, function(err){
               if(err) return res.json({error:true, message:err});
               Feed.deleteMany({
                   created_by: mongoose.mongo.ObjectID(req.params.leader_id),
                   user_id: mongoose.mongo.ObjectID(req.session.user._id)
               });

               return res.json({success:true})
           });
        });
        app.get('/api/me', function(req,res){
            console.log("me",req.session.user._id)
            res.json({id: req.session.user._id})
        });
    //Create new post
        app.post('/api/postknute', function(req,res){
            const creator = mongoose.mongo.ObjectID(req.session.user._id);
            console.log('creator of post:',creator)
            const body = req.body; // -> img, title, id, shareable
            body.creator = creator;
            let knute = require('./services/saveKnute.js')(body,req);
                knute.then(r => res.json({success:true,message:"POST created"}))
                knute.catch(err => {res.json({error:err}); throw Error(err)})
    });
    //Get feed of posts
        //Query ? limit & offset
        app.get('/api/feed', function(req,res){
            const lim = req.query.limit ? Number(req.query.limit) : 10;
            const off = req.query.offset ? Number(req.query.offset) : 0;
            Feed.find({user_id: mongoose.mongo.ObjectID(req.session.user._id)})
                .sort({post_id:-1})
                .limit(lim)
                .skip(off)
                .exec(function(err,feed){
                    if(!err && feed){
                        let f = feed.map((fe)=> {return fe["post_id"]});
                       Post.find({_id: f})
                       .exec(function(error, posts){
                           if(!error){
                               return res.json({posts: posts === 0 ? [] : posts.reverse()});
                           }
                       })
                    }
                });
        });
    app.get('/api/adminfeed', function(req,res){
            User.find({'_id':req.session.user._id}).exec((err, user)=> {
                if(!user[0].elevated)return res.json({posts:[]});
                const lim = req.query.limit ? Number(req.query.limit) : 10;
                const off = req.query.offset ? Number(req.query.offset) : 0;
                Feed.find({})
                    .exec(function(err,feed){
                        if(!err && feed){
                            let f = feed.map((fe)=> {return fe["post_id"]});
                            Post.find({_id: f})
                                .sort({ "_id": -1 })
                                .limit(lim)
                                .skip(off)
                                .exec(function(error, posts){
                                    if(!error){
                                        return res.json({posts: posts === 0 ? [] : posts});
                                    }
                                })
                        }
                    });
            })

        });
    app.get('/api/deletePost/:id', function(req,res){
       Post.find({_id: req.params.id}).exec((err,post) => {
           if(String(post[0].creator) === req.session.user._id){
               let postToDelete = mongoose.mongo.ObjectID(req.params.id);
               let remove = require('./services/deleteKnute.js')(postToDelete);
               remove.then(r => res.json({success:true}))
           }else{
               res.json({error:'You do not own this content'})
           }
       })
    });
    app.get('/api/admindelete/:id',function(req,res){
        User.find({'_id':req.session.user._id}).exec((err, user)=> {
            if(!user[0].elevated)return res.json({error:'Not admin'});
            let post = mongoose.mongo.ObjectID(req.params.id);
            let remove = require('./services/deleteKnute.js')(post)
            remove.then(r => res.json({success:true}))
        })
    })
    //Get scoreboard <-- Not ready !!! #TODO
    app.get('/api/top', function(req,res){
        Feed.aggregate([
            {"$match": {"user_id":req.session.user._id}},
            { "$group": { "created_by": "$created_by", "count": {"$sum": 1 }}},
            {"$sort":-1}], (err,aggdata) =>{
            //Handle the
            console.log(aggdata);
        })
    })



app.use(express.static(path.join(__dirname, '/build')));
app.use('/images',express.static(path.join(__dirname, '/images')));
app.get('/', function (req, response) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    response.sendFile('./build/index.html')
});
app.get('*', function(req,res){
    res.redirect('/');
})



app.listen(8000);