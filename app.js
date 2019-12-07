
'use strict';

/* Component  setup */
var express         = require('express');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var app             = new require("express")();

app.use(function (req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST,OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method == 'OPTIONS') {
    res.status(200).json();
  } else {
      next()
  }
});


var router_specialization  = require('./app/controller/route_specialization.js');
var router_doctor     = require('./app/controller/route_doctor.js');
var router_undef    = require('./app/controller/route_undef.js');

/* Create express app */


/* Database configuration */
mongoose.connect('mongodb://localhost:27017/Doctortest',{useNewUrlParser: true},(err) => {
    if(!err)
    {
        console.log("Successfully connected to mongodb");
    }
    else
    {
        console.log("Failed to connect to mongodb");
    }
});

/* Service static files from application */
app.use(express.static('public/dist'));

app.get("/test", function (req, res) {
    res.send("test page");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Routing middlewares */
app.use('/specialization', router_specialization);
app.use('/doctor',    router_doctor);

/* For handling undefined paths which haven't been addressed by any of the router path */
app.use(router_undef);

app.use(function (err, req, res, next) {
    if(typeof err.status === "undefined") {
        err.status  = 500;
        err.message = "Unknown error"
    }
    res.status(err.status).send({error: err.message});
});

app.listen(3000, () => {
    console.log("Express server started at port 3000");
});

