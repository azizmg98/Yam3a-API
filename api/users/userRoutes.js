const express = require("express");
const {
  updateUser,
  signin,
  signup,
  getUsers,
  fetchSingleUser,
  createGathering,
  createLocation,
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

router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  editProfile
);

router.get("/:userId", fetchSingleUser);
router.put("/:userId", upload.single("image"), updateUser);
// create a gathering
router.post(
  "/:userId/gathering",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createGathering
);

router.post(
  "/:userId/location",
  passport.authenticate("jwt", { session: false }),
  createLocation
);
module.exports = router;
