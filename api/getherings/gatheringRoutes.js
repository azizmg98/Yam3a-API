const express = require("express");
const passport = require("passport");
const {
  fetchGatherings,
  createGathering,
  updateGathering,
  deleteGathering,
} = require("./gatheringControllers");
const upload = require("../../middleware/multer");

const router = express.Router();

// fetch all gatherings
router.get("/gatherings", fetchGatherings);

// create a gathering
router.post(
  "/gatherings",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createGathering
);

// update a gathering
router.put(
  "/gatherings",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateGathering
);

// delete a gathering
router.delete("/:gatheringId", deleteGathering);

// export gathering router
module.exports = router;
