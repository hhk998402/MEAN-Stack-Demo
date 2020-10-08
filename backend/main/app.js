var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

var studentRouter = require('./routes/student');
var courseRouter = require('./routes/course');
var adminRouter = require('./routes/admin');
dotenv.config();

let app = express();

//Connect to Database
mongoose.connect(
    process.env.MONGO_DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true}, 
    function(err) {
        if (err) {
            console.log(err);
            process.exit(1);
        } else {
            console.log('Database ready to use.');
        }
    }
);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/student', studentRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);

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
    res.send("ERROR: We can't find the page you are looking for");
});

module.exports = app;