const express = require("express");
const router = express.Router();

const {
  getUsers,
  searchUsers,
} = require("../controllers/userController");

// Get All Users
router.get("/", getUsers);

// Search Users
router.get("/search", searchUsers);

module.exports = router;