
let mongoose = require ('mongoose');
let helmet = require('helmet');

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let liftsRouter = require('./routes/lifts');
let skillsRouter = require('./routes/skills');
let cardioRouter = require('./routes/cardio');

let skillsMenu = require('./routes/skillsMenu');
let liftsMenu = require('./routes/liftsMenu');
let cardioMenu = require('./routes/cardioMenu');


let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/lifts', liftsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/cardio', cardioRouter);

app.use('/skillsmenu', skillsMenu);
app.use('/liftsmenu', liftsMenu);
app.use('/cardiomenu', cardioMenu);

mongoose.connect('mongodb://localhost/myprs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true 
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));


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
  res.send(err.message);
});

module.exports = app;

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on PORT: ${port}`));