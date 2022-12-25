const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || " INTERNAL SERVER ERROR ";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource Not Found!! : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate error
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} Already exists`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "jsonWebTokenError") {
    const message = `Json Web Token is Invalid, Try again`;
    err = new ErrorHandler(message, 400);
  }
  // Expired JWT error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token Expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
  next(err);
};
