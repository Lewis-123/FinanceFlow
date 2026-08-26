var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

const connectDB = require('./config/database');

connectDB();


const session = require("express-session");

const MongoStore = require("connect-mongo").MongoStore;


var hbs = require('hbs');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();


// View engine setup

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');


// Register HBS partials

hbs.registerPartials(
    path.join(__dirname, 'views/partials')
);



// Session Configuration

app.use(
    session({

        secret: process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,


        store: MongoStore.create({

            mongoUrl: process.env.MONGO_URI

        }),


        cookie: {

            maxAge: 1000 * 60 * 60 * 24

        }

    })
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



// 404 Handler

app.use(function(req, res, next) {

    next(createError(404));

});



// Error Handler

app.use(function(err, req, res, next) {

    res.locals.message = err.message;

    res.locals.error = req.app.get('env') === 'development'
        ? err
        : {};

    res.status(err.status || 500);

    res.render('error');

});


module.exports = app;