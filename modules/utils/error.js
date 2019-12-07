
'use strict'
exports = module.exports;

exports.return_error = function(message, code, next) {
    //HACK. Remove this which has been added only for Joi
    if(typeof message === "object")
        message = message[0].message;
    var err = new Error(message);
    err.status = code;
    return next(err);
}