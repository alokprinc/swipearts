const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Checking Authorization
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ErrorHandler("Please Login", 401);
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_ADMIN_KEY);
  req.user = await User.findById(decodedData.id);

  next();
};

// Checking for Admin rights
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ErrorHandler(
        `Role : ${req.user.role} is not authorized to access this resource`,
        403
      );
    }
    next();
  };
};
