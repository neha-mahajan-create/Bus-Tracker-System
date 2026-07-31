const mongoose = require("mongoose");

const driverLocationSchema = new mongoose.Schema({

    busNumber: {

        type: String,
        required: true,
        unique: true,

    },

    latitude: {

        type: Number,
        required: true,

    },

    longitude: {

        type: Number,
        required: true,

    },

    updatedAt: {

        type: Date,
        default: Date.now,

    },

});

module.exports = mongoose.model(
    "DriverLocation",
    driverLocationSchema
);