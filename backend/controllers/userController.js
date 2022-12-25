const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");

// Register User
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample Id",
      url: "avatar url sample",
    },
  });
  sendToken(user, 201, res);
};

// Login User
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  // if email or password is not entered
  if (!email || !password) {
    throw new ErrorHandler("Please Enter User Email Id and Password", 400);
  }
  // finding user in database
  const user = await User.findOne({ email: email }).select("+password");
  // if user do not exists
  if (!user) {
    throw new ErrorHandler("Invalid Email or Password", 401);
  }
  //  if user exist checking password for match in database
  const isPasswordMatched = await user.comparePassword(password);
  // if password does not matches
  if (!isPasswordMatched) {
    throw new ErrorHandler("Invalid Email or Password", 401);
  }
  sendToken(user, 200, res);
};

// Logout User
exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};
