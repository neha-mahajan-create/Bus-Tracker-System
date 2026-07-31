const express = require("express");

const router = express.Router();

const {
  getUserDashboard,
  assignBusToUser,
} = require("../controllers/userDashboardController");
router.get("/:id", getUserDashboard);
router.put("/assign-bus", assignBusToUser);

module.exports = router;