const express = require("express");
const ErrorHandler = require("./middlewares/error");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("uploads"));
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// routes
const user = require("./routes/user.routes");
app.use("/api/v2/user", user);

// ErrorHandleing
app.use(ErrorHandler);

module.exports = app;
