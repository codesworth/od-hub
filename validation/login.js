const Validator = require('validator');
const isEmpty = require('./is_Empty');


module.exports = function validateLoginInput(data){
    
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';



    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required'
    }



    return {errors, isValid:isEmpty(errors)}
}