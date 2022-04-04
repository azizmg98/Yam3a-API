const express = require("express");
const passport = require("passport");
const {
  fetchLocations,
  getHostLocations,
  createLocation
} = require("./locationControllers");
const upload = require("../../middleware/multer");

const router = express.Router();

// fetch all locations
router.get("/", fetchLocations);

// fetch Host Locations:
router.get("/:userId", getHostLocations);

// create a location
router.post(
  "/:userId/location",
  passport.authenticate("jwt", { session: false }),
  createLocation
);

// export location router
module.exports = router;
