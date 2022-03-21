const express = require("express");
const {
  signin,
  signup,
  getUsers,
  deleteUser,
  editProfile,
  getUser,
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

module.exports = router;
