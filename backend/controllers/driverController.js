const Bus = require("../models/Bus");


const driverLogin = async (req, res) => {

    try {

        console.log("==================================");
        console.log("Driver Login API HIT");
        console.log(req.body);

        const { driverName, busNumber } = req.body;

        const bus = await Bus.findOne({

            driverName: driverName.trim(),

            busNumber: busNumber.trim(),

        });

        console.log("Bus Found:", bus);

        if (!bus) {

            return res.status(404).json({

                message: "Invalid Driver Name or Bus Number",

            });

        }

        res.json({

            message: "Driver verified",

            bus,

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error",

        });

    }

};
const DriverLocation = require("../models/DriverLocation");

// ==============================
// Update Driver Location
// ==============================

const updateLocation = async (req, res) => {

    try {

        const {
            busNumber,
            latitude,
            longitude,
        } = req.body;

        const location = await DriverLocation.findOneAndUpdate(

            { busNumber },

            {
                latitude,
                longitude,
                updatedAt: new Date(),
            },

            {
                new: true,
                upsert: true,
            }

        );

        res.json({

            success: true,
            location,

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Unable to update location",

        });

    }

};

// ==============================
// Get Driver Location
// ==============================

const getLocation = async (req, res) => {

    try {

        const { busNumber } = req.params;

        const location = await DriverLocation.findOne({

            busNumber,

        });

        if (!location) {

            return res.status(404).json({

                message: "Location not found",

            });

        }

        res.json(location);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error",

        });

    }

};

module.exports = {

    driverLogin,
    updateLocation,
    getLocation,

};