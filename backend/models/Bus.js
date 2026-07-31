const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    busName: {
      type: String,
      required: true,
      trim: true,
    },

    route: {
      type: String,
      required: true,
      trim: true,
    },

    driverName: {
      type: String,
      required: true,
      trim: true,
    },

    currentLocation: {
      type: String,
      default: "Bus Depot",
    },

    eta: {
      type: String,
      default: "Not Available",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Maintenance"],
      default: "Active",
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bus", busSchema);