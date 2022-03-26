const express = require("express");
const passport = require("passport");
const {
  fetchGatherings,
  createGathering,
  updateGathering,
  deleteGathering,
  fetchSingleGathering,
  fetchGuestGathering,
  fetchHostGathering,
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

// fetch guest gatherings using req.user
router.get(
  "/guest/:userId",
  // passport.authenticate("jwt", { session: false }),
  fetchHostGathering
);

// fetch single gatherings
router.get("all/:gatheringId", fetchSingleGathering);

// create a gathering
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createGathering
);

// update a gathering
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateGathering
);

// delete a gathering
router.delete("/:gatheringId", deleteGathering);

// export gathering router
module.exports = router;
