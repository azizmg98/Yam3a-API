const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const {
  fetchGatherings,
  fetchHostGathering,
  createGathering,
  addGuest,
} = require("./gatheringControllers");

const router = express.Router();

// fetch all gatherings
router.get("/", fetchGatherings);

// fetch host gatherings using req.user
router.get(
  "/host/",
  passport.authenticate("jwt", { session: false }),
  fetchHostGathering
);

// create a gathering
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createGathering
);

// add guest to gathering
router.post("/guest", addGuest);

// export gathering router
module.exports = router;
