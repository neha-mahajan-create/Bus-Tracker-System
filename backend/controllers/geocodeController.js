const axios = require("axios");

// Get coordinates from place name
const geocodePlace = async (req, res) => {

    try {

        const { place } = req.query;

        if (!place) {

            return res.status(400).json({
                message: "Place is required",
            });

        }

        // Force search inside Maharashtra, India
        const searchPlace = `${place}, Maharashtra, India`;

        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    format: "json",
                    q: searchPlace,
                    limit: 1,
                    addressdetails: 1,
                },
                headers: {
                    "User-Agent": "bus-tracker-app",
                },
            }
        );

        if (response.data.length === 0) {

            return res.status(404).json({
                message: "Location not found",
            });

        }

        const data = response.data[0];

        res.json({
            lat: parseFloat(data.lat),
            lng: parseFloat(data.lon),
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    geocodePlace,
};