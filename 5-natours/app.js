const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

const AppError = require('./utils/appError');

const app = express();

// middleware
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl}`,
  // });

  next(new AppError(`Can't find ${req.originalUrl}`, 404)); // if the next function receives an argument express automatically knows
  // whatever we pass into next is an error. Express skips all other middlewares and forwards the error to the global
  // error handling middleware
});

app.use(globalErrorHandler);

module.exports = app;
