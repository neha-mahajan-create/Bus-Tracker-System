const express = require("express");
const router = express.Router();

const {
  addBus,
  getBuses,
  updateBus,
  searchBus,
  deleteBus,
} = require("../controllers/busController");
router.post("/add", addBus);

router.get("/", getBuses);

router.put("/:id", updateBus);

router.delete("/:id", deleteBus);

router.get("/search", searchBus);

module.exports = router;