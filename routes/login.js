var express = require('express');
var router = express.Router();
var _ = require('underscore');
//var users = require('../module/user');
var q = require('q');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/*router.post('/login', function(req, res, next) {
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
});*/

router.post('/login', function(req, res, next) {
    if(req.method == "POST"){
        var post  = req.body;
        var name= post.name;
        var password= post.password;

        var sql="select name, password from users where name=' "+name+" ' and password=' "+password+"'";
        db.query(sql, function(err, results){
            if(results.length){
                req.session.userId = results[0].id;
                req.session.user = results[0];
                console.log(results[0].id);
                res.redirect('/register');
            }
        });
    }
});

module.exports = router;