const express = require('express');
const router = express.Router();
const {Users} = require('../../models/user');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport')

// Load Input Validator and insert to each route
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   GET api/users/test
// desc     Test user route
// @acess   Public route

router.get('/test', (req, res)=>{
    res.json({message: 'Users route test worked!'});
})

// @route   GET api/users/register
// desc     Login user / returning JWT Token
// @acess   Public route

router.post('/register', (req, res)=>{
    const {errors, isValid} = validateRegisterInput(req.body); //req.body hold all info (id, email, name...)
    // Check Validation
        if(isValid){ //WATSE A LOT OF TIME
            return res.status(400).json(errors);
        }
    const email = req.body.email;
    Users.findOne({email})
        .then(user=>{
            if(user) {
                errors.email = 'Email is already exist!'
                return res.status(400).json(errors)
            } else {
                const avarta = gravatar.url((req.body.email),{
                    s: '200', // Size
                    r: 'pg', // Rating
                    d: 'mm' // Default
                });
                const newUsers = new Users({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avarta
                });

                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUsers.password, salt, (err, hash)=>{
                        if (err) throw err;
                        newUsers.password = hash;
                        newUsers.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        });
})

// @route   POST api/users/login
// desc     User register
// @acess   Public route

router.post('/login', (req,res)=>{

    const {errors, isValid} = validateLoginInput(req.body); //req.body hold all info (id, email, name...)
    // Check Validation
        if(isValid){ //WATSE A LOT OF TIME
            return res.status(400).json(errors);
        }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    Users.findOne({email})
        .then(user => {
            //Check for user
            if(!user){
                errors.email = 'Email not found!'
                res.json(errors);
            }

            //compare between password by req.body.password vs user password in database
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if(isMatch){
                        // User matched - create user payload
                        const payload = {id:user.id, name: user.name, avatar: user.avatar} 
                        //Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey, 
                            {expiresIn: 3600},
                            (err, token)=>{
                                if(err) throw err;
                                res.json({
                                    sucess:true,
                                    // Bearer is default by passport jwt
                                    token: 'Bearer ' + token 
                                })
                            });
                    } else {
                        errors.password = 'Incorrect Password!'
                        return res.status(400).json(errors)
                    }

                })
        })
})
// @route   GET api/users/current
// desc     Current User and Check Passport JWT
// @acess   Private route - this route is protected
router.get('/current', 
    passport.authenticate('jwt', {session: false}), 
    (req,res)=>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})


module.exports = router;