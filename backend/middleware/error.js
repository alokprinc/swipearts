const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || " INTERNAL SERVER ERROR ";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
  next(err);
};
