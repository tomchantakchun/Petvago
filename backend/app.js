var createError = require('http-errors');
var express = require('express');
var path = require('path');
const db = require('./config/database-init.js').knex;
// const cookieSession = require('cookie-session');
require('dotenv').config();

// var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hotelRouter = require('./routes/hotel');
var searchRouter = require('./routes/search');
var chatroomRouter = require('./routes/chatroom');
var bookingRouter = require('./routes/booking');
var reviewRouter = require('./routes/review');

// For login {--
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./login-signup/auth-router');
require('./login-signup/passport-service');

// const jwt = require('jwt-simple');
// const users = require('./login-signup/temUser');
// const JWTauthClass = require('./login-signup/jwt-auth');
// var JWTauth = JWTauthClass();
// --}

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to DB
app.use(function(req, res, next) {
  req.db = db; 
  next();
});

// Login
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// API
app.use('/api/userprofile',passport.authenticate('jwt', {session: false}), usersRouter);
app.use('/api/hotel',hotelRouter);
app.use('/api/search',searchRouter);
app.use('/api/chatroom',chatroomRouter);
app.use('/api/booking',bookingRouter);
app.use('/api/review',reviewRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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



app.listen(8080,()=>{
  console.log("Application started at port:8080");
});

module.exports = app;
