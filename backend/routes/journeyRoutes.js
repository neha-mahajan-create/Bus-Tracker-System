const express = require("express");

const router = express.Router();

const {
  addJourney,
  getRoutes,
  searchRoutes,
  updateRoute,
  deleteRoute,
} = require("../controllers/journeyController");

router.post("/add", addJourney);

router.get("/", getRoutes);

router.get("/search", searchRoutes);

router.put("/:id", updateRoute);

router.delete("/:id", deleteRoute);

module.exports = router;