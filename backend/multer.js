const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.floor(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, uniqueSuffix + '.png');
  },
});

exports.upload = multer({ storage });
