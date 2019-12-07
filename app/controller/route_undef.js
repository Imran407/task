

var express = require('express');

var router = express.Router();

router.all(function(req, res, next) {
    var err = new Error('Page Not Found');
    next(err);
});

module.exports = router;

