const path = require("path");
const userModel = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const fs = require("fs");

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

    const newUser = await userModel.create(user);

    res
      .status(201)
      .json({
        success: true,
        user: newUser,
        message: "User created successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
