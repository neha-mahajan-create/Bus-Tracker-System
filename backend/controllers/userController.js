const User = require("../models/User");
const Feedback = require("../models/Feedback");

// Get All Users
const getUsers = async (req, res) => {
  try {

    const users = await User.find(
      { role: "user" },
      "-password"
    );

    const result = await Promise.all(

      users.map(async (user) => {

        const feedbackCount = await Feedback.countDocuments({
          user: user._id,
        });

        return {
          ...user.toObject(),
          feedbackCount,
        };

      })

    );

    res.json(result);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Search Users
const searchUsers = async (req, res) => {

  try {

    const query = req.query.query;

    const users = await User.find({
      role: "user",
      $or: [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          email: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    }).select("-password");

    const result = await Promise.all(

      users.map(async (user) => {

        const feedbackCount = await Feedback.countDocuments({
          user: user._id,
        });

        return {
          ...user.toObject(),
          feedbackCount,
        };

      })

    );

    res.json(result);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getUsers,
  searchUsers,
};