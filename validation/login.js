//Search for Validator Github keyword
const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};
    //data = req.body
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    //isLength, isEmail, isPassword is availble; isEmpty is our function


    if(validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }

    if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }

    if(!validator.isLength(data.password,{min:6, max:30})){
        errors.password = 'Password must be between 6 and 30 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors) // forward err to isEmpty function to check
    };
} 