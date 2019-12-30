const config = require('config');
const mongoose = require ('mongoose');
const helmet = require('helmet');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const adminRouter = require('./routes/admin');
const movementRouter = require('./routes/movements');
const personalRecords = require('./routes/personalRecords');

const liftsRouter = require('./routes/lifts');
const skillsRouter = require('./routes/skills');
const cardioRouter = require('./routes/cardio');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use('/', indexRouter);

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/admin', adminRouter);
app.use('/api/movements', movementRouter);
app.use('/api/personalrecord', personalRecords);

app.use('/api/lifts', liftsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/cardio', cardioRouter);


//! set myPRs_jwtPrivateKey=mySecureKey
const jwtPrivateKey = process.env.jwtPrivateKey;

if(!jwtPrivateKey) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1)
}
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
  res.sendStatus(err.message);
});

module.exports = app;

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on PORT: ${port}`));