const Validator = require('validator');
const isEmpty = require('./is_Empty');


module.exports = function validateRegisterInput(data){
    
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.name, {min:2, max:30})){
        errors.name = "name must be between two and 30 Characters"
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required'
    }

    if (!Validator.isLength(data.password, {
        min: 6,
        max: 30
    })) {
        errors.password = 'Password must be atleast 6 characters'
    }

    if (!Validator.isLength(data.password2, {
            min: 6,
            max: 30
        })) {
        errors.password2 = 'Password 2 must be atleast 6 characters'
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Password 2 is required'
    }

    if (!Validator.equals(data.password, data.password2)) {
        console.log(`The passwords ${data.password} and ${data.password2}`);
        errors.password2 = "Password 2 doest match"
    }

    return {errors, isValid:isEmpty(errors)}
}