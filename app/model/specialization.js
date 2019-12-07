
'use strict';

var mongoose   = require('mongoose');

var schema = mongoose.Schema;

var schema_specialization = new schema({
    name      : String,
    deleted   : Boolean},
    {collection: 'specialization', timestamps: true, versionKey: false});

var model_specialization = mongoose.model('specialization', schema_specialization);

module.exports = model_specialization;