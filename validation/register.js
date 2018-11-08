const validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {

    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';


    if (!validator.isLength(data.name, {
            min: 2,
            max: 30
        })) {
        errors.name = 'name must be between 2 to 30 charecters';
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Enter valid Email ID';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!validator.isLength(data.password, {
            min: 10,
            max: 10
        })) {
        errors.password = 'Password length must be 10 charecters'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }


}