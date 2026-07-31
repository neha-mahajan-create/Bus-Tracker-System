const mongoose = require("mongoose");

const journeySchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    stops: [
      {
        type: String,
        trim: true,
      },
    ],

    distance: {
      type: String,
      required: true,
    },

    estimatedTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Journey ||
  mongoose.model("Journey", journeySchema);