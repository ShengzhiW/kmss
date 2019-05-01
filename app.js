var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var exphbs  = require('express-handlebars');



var login = require('./routes/login');
var index = require('./routes/index');
var maps = require('./routes/maps');
var preparations = require('./routes/preparations');
var trending = require('./routes/trending');


var app = express();


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', login.view);
app.get('/index', index.view);
app.get('/maps', maps.view);
app.get('/preparations', preparations.view);
app.get('/trending', trending.view);

app.listen(3000);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};


//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
