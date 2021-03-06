const createError = require('http-errors');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config()
require('./db/db')


const usersRouter = require('./routes/users');
const campaignsRouter = require('./routes/campaigns');

const app = express();
const session =require("express-session")
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus:200
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session({
//   resave:false,
//   secret:"shh",
//   saveUninitialized:false
// }))
// app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/campaigns', campaignsRouter);

// app.listen(process.env.PORT, () => {
//   console.log(`listening on port ${process.env.PORT}`);
// })

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
