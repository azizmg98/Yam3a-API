const express = require("express");
const passport = require("passport");
const {
  fetchGatherings,
  createGathering,
  updateGathering,
  deleteGathering,
  fetchSingleGathering,
  fetchUserGatherings,
} = require("./gatheringControllers");
const upload = require("../../middleware/multer");

const router = express.Router();

// fetch all gatherings
router.get("/", fetchGatherings);

// fetch single gathering
router.get("/:gatheringId", fetchSingleGathering);

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

// fetch user gatherings
router.post(":userId", fetchUserGatherings);

// export gathering router
module.exports = router;
