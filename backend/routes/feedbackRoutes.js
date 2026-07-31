const express = require("express");
const router = express.Router();

const {
  addFeedback,
  getAllFeedback,
  getMyLatestFeedback,
} = require("../controllers/feedbackController");

// Submit Feedback
router.post("/add", addFeedback);

// Get all feedback (Admin)
router.get("/", getAllFeedback);

// Get latest feedback of one user
router.get("/user/:userId", getMyLatestFeedback);

module.exports = router;