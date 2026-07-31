const Bus = require("../models/Bus");

const addBus = async (req, res) => {
  try {
    console.log("Received:", req.body);

    const bus = await Bus.create(req.body);

    console.log("Saved:", bus);

    res.status(201).json(bus);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Get All Buses
// =======================
const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find().sort({ createdAt: -1 });

    res.status(200).json(buses);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Update Bus
// =======================
const updateBus = async (req, res) => {
  try {

    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBus) {
      return res.status(404).json({
        message: "Bus not found",
      });
    }

    res.status(200).json({
      message: "Bus Updated Successfully",
      bus: updatedBus,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// =======================
// Delete Bus
// =======================
const deleteBus = async (req, res) => {

  try {

    const deletedBus = await Bus.findByIdAndDelete(req.params.id);

    if (!deletedBus) {
      return res.status(404).json({
        message: "Bus not found",
      });
    }

    res.status(200).json({
      message: "Bus Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// =======================
// Search Bus
// =======================
const searchBus = async (req, res) => {
  try {
    const { query } = req.query;

    const buses = await Bus.find({
      $or: [
        { busNumber: { $regex: query, $options: "i" } },
        { busName: { $regex: query, $options: "i" } },
        { route: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(buses);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  addBus,
  getBuses,
  updateBus,
  searchBus,
  deleteBus,
};