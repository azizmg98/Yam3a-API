const express = require("express");
const passport = require("passport");
const {
  fetchLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} = require("./locationControllers");
const upload = require("../../middleware/multer");

const router = express.Router();

// fetch all locations
router.get("/", fetchLocations);

// update a location
router.put(
  "/",
  passport.authenticate("local", { session: false }),
  upload.single("image"),
  updateLocation
);

// delete a location
router.delete("/:locationId", deleteLocation);

// export location router

module.exports = router;
