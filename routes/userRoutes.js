const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  userRegister,
  userLogin,
  userData,
  userLogout,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/").post(userRegister).get(getUsers);
router.route("/:id").put(upload.single("image"), updateUser).delete(deleteUser);

router.get("/me", protect, userData);
router.post("/login", userLogin);
router.get("/logout", protect, userLogout);

module.exports = router;
