const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || " INTERNAL SERVER ERROR ";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource Not Found!! : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
  next(err);
};
