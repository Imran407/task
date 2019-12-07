
'use strict';

var mongoose   = require('mongoose');

var schema = mongoose.Schema;

var schema_doctor = new schema({
    doctorname        : String,
    mobile             : String,
    specialization_name   : [Object],
    deleted         : Boolean},
    {collection: 'doctor', timestamps: true, versionKey: false
});

var model_doctor = mongoose.model('doctor', schema_doctor);

module.exports = model_doctor;