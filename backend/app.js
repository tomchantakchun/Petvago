var createError = require('http-errors');
var express = require('express');
var path = require('path');
const db = require('./config/database-init.js').knex;
require('dotenv').config();

// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// For login {--
const jwt = require('jwt-simple');
const users = require('./login-signup/temUser');
const cors = require('cors');
const authClass = require('./login-signup/auth');
var auth = authClass();
// --}

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Login
app.use(auth.initialize());

app.post("/api/login", function(req, res) {  
  console.log(`/api/login called...`);
  if (req.body.name && req.body.password) {
      var name = req.body.name;
      var password = req.body.password;
      var user = users.find((u)=> {
          return u.name === name && u.password === password;
      });
      if (user) {
          var payload = {
              id: user.id,
              username: user.name
          };
          var token = jwt.encode(payload, process.env.JWTSECRET);
          res.json({
              token: token
          });
      } else { res.sendStatus(401) }
  } else { res.sendStatus(401) }
});

app.get('/api/users', auth.authenticate(),(req,res)=>{
  res.json(users);
})



// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
