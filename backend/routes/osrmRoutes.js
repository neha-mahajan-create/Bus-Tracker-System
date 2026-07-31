const express = require("express");

const router = express.Router();

const {
  getRoadRoute,
} = require("../controllers/osrmController");

router.post("/road-route", getRoadRoute);

module.exports = router;