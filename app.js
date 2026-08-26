var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

const connectDB = require('./config/database');

// Connect to MongoDB
connectDB();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// View engine setup
var hbs = require('hbs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// Register partials
hbs.registerPartials(
    path.join(__dirname, 'views/partials')
);


// Middleware
app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', indexRouter);

app.use('/users', usersRouter);


// Catch 404 errors
app.use(function(req, res, next) {

    next(createError(404));

});


// Error handler
app.use(function(err, req, res, next) {

    res.locals.message = err.message;

    res.locals.error = req.app.get('env') === 'development' 
        ? err 
        : {};

    res.status(err.status || 500);

    res.render('error');

});


module.exports = app;