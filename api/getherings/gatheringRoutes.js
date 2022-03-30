const express = require("express");
const passport = require("passport");
const {
  fetchGatherings,
  updateGathering,
  deleteGathering,
  fetchSingleGathering,
  fetchHostGathering,
  addGuest,
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
router.delete("/host/:gatheringId", deleteGathering);

// add guest to gathering
router.post("/guest", addGuest);

// fetch user gatherings
// router.get("/:userId", fetchUserGatherings);

// export gathering router
module.exports = router;
