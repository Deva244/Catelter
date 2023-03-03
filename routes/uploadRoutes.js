const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { uploadImg } = require("../controllers/uploadController");

router.post("/", upload.single("image"), uploadImg);

module.exports = router;
