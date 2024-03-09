const express = require("express");
const { upload } = require("../multer");
const { createUser } = require("../controllers/user.controller");
const router = express.Router();


router.post("/create", upload.single("file"), createUser);

module.exports = router;

