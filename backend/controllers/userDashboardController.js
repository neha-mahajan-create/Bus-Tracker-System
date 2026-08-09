const User = require("../models/user");

const getUserDashboard = async (req, res) => {

  try {

    const user = await User.findById(req.params.id)
      .populate({
        path: "assignedBus",
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


const assignBusToUser = async (req, res) => {

  try {

    const { userId, busId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        assignedBus: busId,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Bus assigned successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getUserDashboard,
  assignBusToUser,
};