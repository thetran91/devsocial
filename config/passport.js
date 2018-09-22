//Search on google for Passport github
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt; // extract payload
const mongoose = require('mongoose');
const {Users} = require('../models/user');
const keys = require('../config/keys');

const opts = {};
// Extract information of Header (user, password, id...) and put into opts{}
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey; // secreteOrKey is default and can not be changed!

module.exports = passport =>{
    passport.use(
        new jwtStrategy(opts, (jwt_payload,done)=>{
        // Find User by id - because jwt_payload has this information - we get the user
        Users.findById(jwt_payload.id)
            .then(user =>{
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));

    }))
}



 