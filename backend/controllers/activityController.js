const Bus = require("../models/Bus");
const User = require("../models/User");
const Journey = require("../models/Journey");
const Feedback = require("../models/Feedback");

const getRecentActivities = async (req, res) => {

  try {

    const latestBus = await Bus.findOne().sort({ createdAt: -1 });

    const latestUser = await User.findOne({ role: "user" }).sort({ createdAt: -1 });

    const latestRoute = await Journey.findOne().sort({ createdAt: -1 });

    const latestFeedback = await Feedback.findOne()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({
      latestBus,
      latestUser,
      latestRoute,
      latestFeedback,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getRecentActivities,
};