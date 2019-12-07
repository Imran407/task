
'use strict';
exports = module.exports;

var express        = require('express');
var model_doctor     = require('../model/doctor');
var model_specialization  = require('../model/specialization');
const error        = require('../../modules/utils/error');

var router         = express.Router();

function create_doc_details(doctor) {
    this.doctorname       = doctor.doctorname;
    this.mobile       = doctor.mobile;
    this.specialization_name = doctor.specialization_name;
}

/* ------------------- Create ------------------- */
router.post('/create', function(req, res, next) {

    var doc_details = new create_doc_details(req.body);

    model_doctor.find({doctorname : doc_details.doctorname}, function (err, doc_list) {
        if (err) { error.return_error(err.message, 500, next); return};
        if(doc_list.length !== 0) { error.return_error('Doctor already exists with the given name', 400, next); return}
        

         model_doctor.create(doc_details, function (err, doc_result) {
            if (err) { error.return_error(err.message, 500, next); return};
            res.json({"status" : "success"});
        });
    });
    
    
});

/* ------------------- Get ------------------- */
router.get('/get', function(req, res, next) {

    return model_doctor.find({_id : req.query._id}, function (err, doc_list) {
        if (err) { error.return_error(err.message, 500, next); return};
        if(doc_list.length === 0) 
        { 
            error.return_error('doctor details not exist', 400, next); return
        }
        else
        {
           res.json(doc_list[0]);
        }
            
    });
});

router.get('/get_list', function(req, res, next) {

    model_doctor.find({}, function (err, doc_list) {
        if (err) { error.return_error(err.message, 500, next); return};
        if(doc_list.length === 0) { error.return_error('doctors list empty', 400, next); return}
        else
            res.json(doc_list);
    });
    
});

/* ------------------- Update ------------------- */
router.put('/update', function(req, res, next) {
    
    model_doctor.find({ $and: [{_id: {$ne:req.body._id}},{ doctorname : req.body.doctorname }]}, function (err, doc_list) {
        if (err) { error.return_error(err.message, 500, next); return};
        if(doc_list.length !== 0) { error.return_error('doctor name already exists with the given name', 400, next); return}

        model_doctor.find({_id : req.body._id}, function (err, get_doc_list) {
            if (err)
            {
                error.return_error(err, 500, next); return
            }
            else if(get_doc_list.length == 0)
            {
                error.return_error('Invalid doctor id for update', 400, next); return
            }
            else
            {
                model_doctor.update({_id : req.body._id}, req.body, function (err, rawResponse) {
                    if (err) { error.return_error(err.message, 500, next); return};
                    if(rawResponse.n !== 1) { error.return_error('Invalid doctor id for update', 400, next); return}
                    res.json({"status" : "success"});
                });
            }
        });
    });
    
});


router.delete('/delete', function(req, res, next) {

    model_doctor.remove({_id : req.body._id}, function (err, writeOpResult) {
        if (err) { error.return_error(err.message, 500, next); return};
        if (writeOpResult.n === 0) { error.return_error("Doctor not found for deletion", 400, next); return}
        var body = {"type": "doctor", "_id": req.body._id};
        res.json({"status" : "success"});
    });
});


module.exports = router;

