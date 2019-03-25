const Validator = require('validator');
const isEmpty = require('./is_Empty');


module.exports = function validateExperienceInput(data){
    
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';


    if (Validator.isEmpty(data.school)) {
        errors.school = 'School is required'
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required'
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'From Date Field is required'
    }

    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy  = 'Fielf of study Field is required'
    }

    

    return {errors, isValid:isEmpty(errors)}
}