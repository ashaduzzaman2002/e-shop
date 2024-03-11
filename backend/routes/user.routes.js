const express = require("express");
const { upload } = require("../multer");
const {
  createUser,
  activationToken,
  loginUser,
  getUser,
} = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.post("/create", upload.single("file"), createUser);
router.post("/activate", activationToken);
router.post("/login", loginUser);
router.get("/me", isAuthenticated, getUser);

module.exports = router;
