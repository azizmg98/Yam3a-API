const express = require("express");
const passport = require("passport");
const {
  fetchGatherings,

  updateGathering,
  deleteGathering,
  fetchSingleGathering,
  fetchGuestGathering,
  fetchHostGathering,
  createLocation,
  fetchUserGatherings,
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
// router.get(
//   "/guest/:userId",
//   // passport.authenticate("jwt", { session: false }),
//   fetchHostGathering
// );

// fetch single gatherings
router.get("all/:gatheringId", fetchSingleGathering);

// update a gathering
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateGathering
);

// delete a gathering
router.delete("/:gatheringId", deleteGathering);

// fetch user gatherings
router.post(":userId", fetchUserGatherings);

// export gathering router
module.exports = router;
