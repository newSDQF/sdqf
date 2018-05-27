var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs=require("ejs");
var session=require("express-session");
var mongoose=require("mongoose");
var dbConfig=require("./config/mongo.config");
console.log(dbConfig);
mongoose.connect(dbConfig.host+"/"+dbConfig.dbname);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');

var app = express();
const FileStore = require('session-file-store')(session);

// 创建 session 中间件
const sessionMiddleware = session({
  secret: 'fdsfdsf fdssdf',
  resave:false,
  saveUninitialized:false,
  cookie: { maxAge: 600000 }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(sessionMiddleware);
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/goods', require("./routes/goods"));
app.use('/order', require("./routes/order"));
app.use('/car', require("./routes/car"));
app.use('/ad', require("./routes/ad"));

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

module.exports = app;
