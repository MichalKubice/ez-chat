const Validator = require("validator");

const isEmpty = require("./is-empty") ;

module.exports = function validateRoomInput(data) {
    let errors = {};
    data.roomName = !isEmpty(data.roomName) ? data.roomName : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    if(Validator.isEmpty(data.roomName)) {
        errors.roomName = "Field is required"
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "Field is required"
    }
    return  {
        errors,
        isValid: isEmpty(errors)
    }
}