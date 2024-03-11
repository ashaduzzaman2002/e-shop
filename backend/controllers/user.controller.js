const path = require("path");
const userModel = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    console.log(name, email, password);

    const existUser = await userModel.findOne({ email });

    if (existUser) {
      const filename = req.file?.filename;
      const filePath = `uploads/${filename}`;
      fs.unlinkSync(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting uploaded file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file?.filename;

    let fileUrl;
    if (filename) {
      fileUrl = path.join(filename);
    }

    const user = {
      name,
      email,
      password,
      avatar: {
        public_id: new Date().toISOString(),
        url: fileUrl,
      },
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    await sendMail({
      to: user.email,
      from: "<EMAIL>",
      subject: "Account Activation",
      html: `Hi ${user.name},<br><br>Please click on the following link to activate your account: <a href="${activationUrl}">Activate Account</a>`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email ${user.email} to activate your account`,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
};

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET_KEY, {
    expiresIn: "5m",
  });
};

// active user
exports.activationToken = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const newUser = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET_KEY
    );

    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    const { name, email, password, avatar } = newUser;

    let user = await userModel.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const createdUser = await userModel.create({
      name,
      email,
      avatar,
      password,
    });

    sendToken(createdUser, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new ErrorHandler("Please provide all the fields!", 400));

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid password", 400));
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
});

// get  user
exports.getUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
});
