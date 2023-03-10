const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
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

// Forgot Password
exports.forgotPassword = async (req, res, next) => {
  // GETTING USER
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new ErrorHandler("User Not Found", 404);
  }
  // GENRATING TOKEN
  const resetToken = user.getResetPasswordToken();
  // SAVING USER AFTER GETTING resetPassowrdToken in model
  await user.save({ validateBeforeSave: false });

  // URL
  const resetPasswordURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password reset token is :- \n\n ${resetPasswordURL} \n\n Please reset your password on then given link`;

  try {
    await sendEmail({
      email: user.email,
      subject: "SwipeArts Password Recovery",
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ErrorHandler(err.message, 500);
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res, next) => {
  // creating token hash
  const resetPasswordTokenHash = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordTokenHash,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ErrorHandler("Invalid or Expired Token", 400);
  }

  if (req.body.password !== req.body.confirmPassword) {
    throw new ErrorHandler("Passwords do not Match", 400);
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
};

// Get User Details

exports.getUserDetails = async (req, res, next) => {
  // getting user
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};

// Update User Password

exports.updateUserPassword = async (req, res, next) => {
  // getting user
  const user = await User.findById(req.user.id).select("+password");
  //  if user exist checking password for match in database
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  // if password does not matches
  if (!isPasswordMatched) {
    throw new ErrorHandler("Incorrect Old Password", 401);
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    throw new ErrorHandler("Passwords do not Match", 400);
  }
  user.password = req.body.newPassword;
  user.save();
  sendToken(user, 200, res);
};

// Update User Profile

exports.updateUserProfile = async (req, res, next) => {
  const newUserDetails = {
    name: req.body.name,
    email: req.body.email,
  };
  //  -----to be added form cloudinary -------//
  if (!newUserDetails.name) {
    throw new ErrorHandler("Please Enter Name", 401);
  }
  if (!newUserDetails.email) {
    throw new ErrorHandler("Please Enter Email", 401);
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserDetails, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
};

// Get All Users -- Admin

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
};

// Get User Details -- Admin

exports.getUserDetailsAdmin = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ErrorHandler(`User having Id:${req.params.id} does not exist`);
  }
  res.status(200).json({
    success: true,
    user,
  });
};

// Update User Role -- Admin

exports.updateUserRole = async (req, res, next) => {
  const newUserDetails = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  if (!newUserDetails.name) {
    throw new ErrorHandler("Please Enter Name", 401);
  }
  if (!newUserDetails.email) {
    throw new ErrorHandler("Please Enter Email", 401);
  }
  const user = await User.findByIdAndUpdate(req.params.id, newUserDetails, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });
  if (!user) {
    throw new ErrorHandler(`User having Id:${req.params.id} does not exist`);
  }
  res.status(200).json({
    success: true,
  });
};

// Delete User -- Admin

exports.deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ErrorHandler(`User having Id:${req.params.id} does not exist`);
  }

  await user.remove();
  res.status(200).json({
    success: true,
  });
};
