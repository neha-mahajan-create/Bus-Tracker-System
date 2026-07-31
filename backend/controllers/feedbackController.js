const mongoose = require("mongoose");
const Feedback = require("../models/Feedback");
const User = require("../models/User");

// ==========================
// Add Feedback
// ==========================
const addFeedback = async (req, res) => {
  try {
    const { userId, rating, message } = req.body;

    // Check required fields
    if (!userId || !rating || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Find logged-in user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Create feedback
    const feedback = await Feedback.create({
      user: user._id,
      name: user.name,
      email: user.email,
      rating,
      message,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get All Feedback
// ==========================
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json(feedbacks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Latest Feedback of Logged-in User
// ==========================
const getMyLatestFeedback = async (req, res) => {
  try {
    const { userId } = req.params;

    const feedback = await Feedback.findOne({
      user: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    res.status(200).json(feedback);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addFeedback,
  getAllFeedback,
  getMyLatestFeedback,
};