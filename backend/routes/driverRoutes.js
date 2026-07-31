const express = require("express");

const router = express.Router();

const {
    driverLogin,
    updateLocation,
    getLocation,
} = require("../controllers/driverController");

// Driver Login
router.post("/login", driverLogin);

// Driver sends live location
router.put("/location", updateLocation);

// User fetches driver's live location
router.get("/location/:busNumber", getLocation);

module.exports = router;