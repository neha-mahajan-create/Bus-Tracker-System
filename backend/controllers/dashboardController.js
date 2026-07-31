const Bus = require("../models/Bus");
const User = require("../models/User");
const Feedback = require("../models/Feedback");
const Journey = require("../models/Journey");

const getDashboardStats = async (req, res) => {
  try {

    const totalBuses = await Bus.countDocuments();

    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const totalRoutes = await Journey.countDocuments();

    const totalFeedback = await Feedback.countDocuments();

    res.status(200).json({
      totalBuses,
      totalUsers,
      totalRoutes,
      totalFeedback,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getDashboardStats,
};