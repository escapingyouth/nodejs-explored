class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // Capture the stack trace, excluding constructor call and itself
    Error.captureStackTrace(this, this.constructor);

    // The stack trace is essentially a record of the active
    // function calls at a particular point in the program's execution.

    // When you create a new instance of an Error object in JavaScript, by default,
    // it captures the stack trace up to the point where the Error object is constructed.
    // However, sometimes you might want to customize or filter out parts of the stack trace.
    // This is where Error.captureStackTrace comes in handy.
  }
}

module.exports = AppError;
