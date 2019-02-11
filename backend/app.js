var createError = require('http-errors');
var express = require('express');
var path = require('path');
const http = require('http')
const socketIO = require('socket.io')
const db = require('./config/database-init.js').knex;
// const cookieSession = require('cookie-session');
require('dotenv').config();




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
//socket
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to DB
app.use(function(req, res, next) {
  req.db = db; 
  next();
});

// Serving website
app.use('/public',express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/public/index.html')
});

// Login
app.use(cors({
  origin: 'https://petvago.site:3000'
}));
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
app.use('/api/userprofile', usersRouter);
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


io.on('connect', socket => {
  console.log('User connected')

  socket.on('enter conversation',(conversationID)=>{
    socket.join(conversationID)
    console.log('user join : ' + conversationID )

  })

  socket.on('send messages',(data)=>{
    socket.to(data.room).emit('refresh messages', data.data)
    
    console.log('send message : ' + data.data )

  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})


server.listen(8080, () => console.log(`Application started at port:8080`))
// app.listen(8080,()=>{
//   console.log("Application started at port:8080");
// });

module.exports = app;
