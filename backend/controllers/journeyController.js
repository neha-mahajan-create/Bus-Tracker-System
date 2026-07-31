const Journey = require("../models/journey");

// Add Journey
const addJourney = async (req, res) => {
  try {

    const journey = await Journey.create(req.body);

    res.status(201).json(journey);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get All Routes
const getRoutes = async (req, res) => {
  try {

    const routes = await Journey.find();

    res.status(200).json(routes);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Search Routes
const searchRoutes = async (req, res) => {

  try {

    const query = req.query.query;

    const routes = await Journey.find({
      $or: [
        { source: { $regex: query, $options: "i" } },
        { destination: { $regex: query, $options: "i" } },
      ],
    });

    res.json(routes);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// Update Route
const updateRoute = async (req, res) => {

  try {

        const updatedRoute = await Journey.findByIdAndUpdate(
        req.params.id,
        req.body,
       { returnDocument: "after" }
      );
    res.json(updatedRoute);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// Delete Route
const deleteRoute = async (req, res) => {

  try {

    await Journey.findByIdAndDelete(req.params.id);

    res.json({
      message: "Route Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  addJourney,
  getRoutes,
  searchRoutes,
  updateRoute,
  deleteRoute,
};