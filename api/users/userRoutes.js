const express = require("express");
const {
  updateUser,
  signin,
  signup,
  getUsers,
  fetchSingleUser,
  createGathering,
  createLocation,
  editProfile,
  updateProfileImage,
} = require("./userControllers");
const passport = require("passport");
const upload = require("../../middleware/multer");

const router = express.Router();

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", signup);
router.get("/", getUsers);

router.get("/:userId", fetchSingleUser);

// create a gathering
router.post(
  "/:userId/gathering",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createGathering
);

// create a location
router.post(
  "/:userId/location",
  passport.authenticate("jwt", { session: false }),
  createLocation
);

router.put("/:userId", upload.single("image"), updateProfileImage);
module.exports = router;
