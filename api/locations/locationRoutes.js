const express = require("express");
const passport = require("passport");
const {
  fetchLocations,
  getHostLocations,
} = require("./locationControllers");
const upload = require("../../middleware/multer");

const router = express.Router();

// fetch all locations
router.get("/", fetchLocations);

// fetch Host Locations:
router.get("/:userId", getHostLocations);

// export location router

module.exports = router;
