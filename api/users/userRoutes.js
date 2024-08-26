const express = require("express");
const {
  signin,
  signup,
  getUsers,
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

router.put("/:userId", upload.single("image"), updateProfileImage);

module.exports = router;
