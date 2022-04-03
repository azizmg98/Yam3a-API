const express = require("express");
const passport = require("passport");
const {
  fetchGatherings,
  fetchHostGathering,
  addGuest,
} = require("./gatheringControllers");
const upload = require("../../middleware/multer");

const router = express.Router();

// fetch all gatherings
router.get("/", fetchGatherings);

// fetch host gatherings using req.user
router.get(
  "/host/",
  passport.authenticate("jwt", { session: false }),
  fetchHostGathering
);

// add guest to gathering
router.post("/guest", addGuest);

// export gathering router
module.exports = router;
