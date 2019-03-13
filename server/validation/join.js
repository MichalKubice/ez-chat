const Validator = require("validator");

const isEmpty = require("./is-empty") ;

module.exports = function validateJoinInput(data) {
    let errors = {};
    data.password = !isEmpty(data.password) ? data.password : '';
    data.id = !isEmpty(data.id) ? data.id : '';
    if(Validator.isEmpty(data.password)) {
        errors.password = "Field is required"
    }
    if(Validator.isEmpty(data.id)) {
        errors.id = "Field is required"
    }
    return  {
        errors,
        isValid: isEmpty(errors)
    }
}
