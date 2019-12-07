
'use strict';

var express       = require('express');
var model_specialization = require('../model/specialization');
const error       = require('../../modules/utils/error');

var router = express.Router();

/* ------------------- Create ------------------- */
router.post('/create', function(req, res, next) {
    console.log("req.body ",req.body);
    model_specialization.find({ name: req.body.name }, function (err, spec_list) {
        if (err) { error.return_error(err.message, 500, next); return};
        
        if(spec_list.length !== 0) { error.return_error('Specialization with this name already exists', 400, next); return}
        /* Write to DB */
        model_specialization.create(req.body, function (err, spe_result) {
            if (err)  return next(err);
            res.json({"status" : "success"});
        });
    });
});

/* ------------------- Get ------------------- */
router.get('/get', function(req, res, next) {
    model_specialization.find({_id : req.query._id}, function (err, spec_list) {
        if (err) { error.return_error(err.message, 500, next); return};
        if(spec_list.length === 0) { error.return_error('Specialization does not exist', 400, next); return}
        else
            res.json(spec_list[0]);
    });
});

router.get('/get_list', function(req, res, next) {
    console.log("------------------sss-------------------");

    model_specialization.find({}, function (err, spec_list) {
        console.log("err ",err);
        if (err) { error.return_error(err.message, 500, next); return};
        if(spec_list.length === 0) { error.return_error('Specialization does not exist', 400, next); return}
        else
            res.json(spec_list);
    });
});

/* ------------------- Update ------------------- */
router.put('/update', function(req, res, next) {

    model_specialization.find({ $and: [{_id: {$ne:req.body._id}},{ name : req.body.name }]}, function (err, spec_list) {
               
        if (err) { error.return_error(err.message, 500, next); return};
        if(spec_list.length !== 0) { error.return_error('Specialization with this name already exists', 400, next); return}
        /* Update to DB */
        model_specialization.update({_id : req.body._id}, req.body, function (err, rawResponse) {
            if (err) { error.return_error(err.message, 500, next); return};

            if(rawResponse.n !== 1) { error.return_error('Invalid Specialization name for update', 400, next); return}
            res.json({"status" : "success"});
        });
    });
});

/* ------------------- Delete ------------------- */
router.delete('/delete', function(req, res, next) {

    model_specialization.remove({_id : req.body._id}, function (err, writeOpResult) {
        if (err) { error.return_error(err.message, 500, next); return};
        if (writeOpResult.n === 0) { error.return_error("Specialization not found for deletion", 400, next); return}
        var body = {"type": "Specialization", "_id": req.body._id};
        res.json({"status" : "success"});
    });
});

module.exports = router;
