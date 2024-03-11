const ErrorHandler = require("./error");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return next(new ErrorHandler("Please login to continue", 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded)
      return next(new ErrorHandler("Please login to continue", 401));
    const user = await userModel.findById(decoded.id);

    if (!user) return next(new ErrorHandler("User does not exist", 401));

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
});
