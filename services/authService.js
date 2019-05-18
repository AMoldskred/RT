const httpRequest = require('request');

const config = require('../config.js');
const User = require('../models/User');

module.exports = function (request, res) {
    var options = {
        url: 'https://api.instagram.com/oauth/access_token',
        method: 'POST',
        form: {
            client_id: config.instagram.client_id,
            client_secret: config.instagram.client_secret,
            grant_type: 'authorization_code',
            redirect_uri: config.instagram.redirect_uri,
            code: request.query.code
        }
    };
    httpRequest(options, function (error, response, body) {
        console.log(body)
        if (!error && response.statusCode == 200) {
            let r = JSON.parse(body);
            User.findOne({ access_token: r.access_token })
                .exec(function (err, user) {
                    let newuser = {
                        id: r.user.id,
                        username: r.user.username,
                        full_name: r.user.full_name,
                        bio: r.user.bio,
                        website: r.user.website,
                        profile_picture: r.user.profile_picture,
                        access_token: r.access_token,
                    };
                    if(!user){
                        new User(newuser).save(function(err,r){
                            request.session.user = {
                                _id: newuser._id,
                                id: newuser.id,
                                username: newuser.username,
                                full_name: newuser.full_name,
                                profile_picture: newuser.profile_picture,
                            };
                            res.redirect('/?login=true');
                        });
                    }
                    else{
                        if(user.profile_picture !== newuser.profile_picture || user.username !== newuser.username){
                            User.updateOne({ access_token: r.access_token },
                                {
                                    username: newuser.username,
                                    profile_picture: newuser.profile_picture,
                                })
                        }
                        request.session.user = {
                            _id: user._id,
                            id: user.id,
                            username: r.user.username,
                            full_name: r.user.full_name,
                            profile_picture: r.user.profile_picture,

                        };
                        if(user.skole){
                            request.session.user.skole = user.skole
                        }
                        console.log('Relogin user:', user.username);

                        res.redirect('/?login=true');
                    }
                })

        }
        else{
           console.log(error)
        }
    });

};