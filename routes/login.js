var express = require('express');
var router = express.Router();
var _ = require('underscore');
var q = require('q');

/* GET users listing. */

router.get('/users', function(req, res, next) {
    res.locals.connection.query('select * from users', function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

module.exports = router;