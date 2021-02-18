var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
/*mongoose.connect('mongodb://localhost:27017/mongoosedb', 
{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log('MongoDB connection has been made.');})
.catch((err)=>{console.log('MongoDB connection failed. Detail: ',err);});*/

mongoose.connect('mongodb://localhost:27017/mongoosedbv1', 
{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex',true);


mongoose.connection.on('open',()=>{console.log('MongoDB connection has been made.');});
mongoose.connection.on('error',(err)=>{console.log('MongoDB connection failed. Detail: ',err);});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var authorRouter = require('./routes/author.route')
var bookRouter = require('./routes/book.route')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts',postsRouter);
app.use('/authors',authorRouter);
app.use('/books',bookRouter);

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
