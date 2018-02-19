var express = require('express');
var router = express.Router();
var _ = require('underscore');
var users = require('../module/user');
var q = require('q');

router.get('/adminpanel', function(req, res, next) {
    res.locals.connection.query('select * from users', function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.post('/edit', function(req, res, next) {
    res.locals.connection.query("update users set name = '"+req.body.name+"', email = '"+req.body.email+"', bloodGroup = '"+req.body.bloodGroup+"', phone_number = '"+req.body.phone_number+"' where id = '"+req.body.id+"'", function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.post('/delete', function(req, res, next) {
    res.locals.connection.query("delete from users where id = '"+req.body.id+"'", function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.post('/new', function(req, res, next) {
    q.all([users.formulateInsertQuery(req.body, 'users')]).then(function(queryRes){
        if(queryRes[0]){
            q.all([users.insertFunction(req, res.locals.connection, q, queryRes[0])]).then(function(insertRes){
                if(insertRes[0][0].insertId > 0){
                    res.json("success")
                } else {
                    res.json("error")
                }
            }).fail(function(err){
                console.log(err.stack)
            })
        }
    }).fail(function(err){
        console.log(err.stack)
    })
});

module.exports = router;
