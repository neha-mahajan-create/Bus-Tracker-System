const express = require("express");
const router = express.Router();

const { geocodePlace } = require("../controllers/geocodeController");

router.get("/", geocodePlace);

module.exports = router;