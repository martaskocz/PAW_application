var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var cookieSession = require('cookie-session');
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var cors = require('cors');
var mysql = require('mysql');

var app = express();

app.set('trust proxy',1);
app.use(cors());
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge : 24*60*60*1000 //24 h
}));

// view engine setup
app.set("port", process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.locals.connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'admin'
    });
    res.locals.connection.connect();
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
