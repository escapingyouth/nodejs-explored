const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful'))
  .catch((error) => console.error('DB connection error:', error));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}... `);
});

// Used to handle unhandled promise rejections globally in your application.
process.on('unhandledRejection', (error) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(error.name, error.message);
  server.close(() => process.exit(1)); // 0 for success 1 for uncaught exception

  // If the server hasn't finished closing in 10 seconds, forcefully shut down
  // setTimeout(() => {
  //   console.error('Forcibly shutting down...');
  //   process.exit(1);
  // }, 10000);
});

// Used to handle synchronous exceptions that are not caught anywhere else in the code
// It does not catch asynchronous errors
process.on('uncaughtException', (error) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(error.name, error.message);
  server.close(() => process.exit(1));
});
