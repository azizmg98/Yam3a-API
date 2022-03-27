const express = require("express");
const passport = require("passport");
const {
  fetchGatherings,

  updateGathering,
  deleteGathering,
  fetchSingleGathering,
} = require("./gatheringControllers");
const upload = require("../../middleware/multer");

const router = express.Router();

// fetch all gatherings
router.get("/", fetchGatherings);

// fetch single gatherings
router.get("/:gatheringId", fetchSingleGathering);

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
