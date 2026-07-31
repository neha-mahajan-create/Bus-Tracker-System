const Journey = require("../models/journey");

const getSelectedRoute = async (req, res) => {

    try {

        const { route } = req.query;

const parts = route.toLowerCase().split(" to ");

const source = parts[0].trim();
const destination = parts[1].trim();

const journey = await Journey.findOne({
    source: new RegExp(`^${source}$`, "i"),
    destination: new RegExp(`^${destination}$`, "i"),
});

        if (!journey) {
            return res.status(404).json({
                message: "Route not found",
            });
        }

        res.json(journey);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    getSelectedRoute,
};