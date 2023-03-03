const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  getCat,
  addCat,
  updateCat,
  deleteCat,
} = require("../controllers/catController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/").get(getCat).post(upload.single("image"), addCat);
router.route("/:id").put(upload.single("image"), updateCat).delete(deleteCat);

module.exports = router;
