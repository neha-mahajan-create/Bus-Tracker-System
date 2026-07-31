const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  adminLogin,
  registerAdmin,
} = require("../controllers/authController");

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

router.post("/admin-login", adminLogin);

router.post("/admin-register", registerAdmin);


module.exports = router;