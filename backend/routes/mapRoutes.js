const express = require("express");

const router = express.Router();

const {
    getSelectedRoute,
} = require("../controllers/mapController");

router.get("/", getSelectedRoute);

module.exports = router;