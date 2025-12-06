require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✓ MongoDB connected'))
.catch(err => console.error('✗ MongoDB connection error:', err));

var app = express();

// set up views and ejs engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// middleware for logging, parsing, and cookies
app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session setup for user authentication
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

// static files (images, css, etc)
app.use(express.static(path.join(__dirname, 'public')));

// make user info available to all views
app.use(function(req, res, next) {
  res.locals.user = req.session ? req.session.userEmail : null;
  res.locals.isLoggedIn = !!(req.session && req.session.userId);
  next();
});

// set up all routes
app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// handle 404 errors
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler - show errors in development
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error', { title: "Error" });
});

// export app to be used in www
module.exports = app;
