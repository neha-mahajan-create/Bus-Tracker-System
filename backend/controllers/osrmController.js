const axios = require("axios");

exports.getRoadRoute = async (req, res) => {
  try {

    const { coordinates } = req.body;

    // coordinates = [[lng,lat],[lng,lat],[lng,lat]]

    const coordString = coordinates
      .map(c => `${c[0]},${c[1]}`)
      .join(";");

    const url =
      `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson`;

    const response = await axios.get(url);

    res.json(response.data.routes[0].geometry.coordinates);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Unable to fetch road route",
    });

  }
};