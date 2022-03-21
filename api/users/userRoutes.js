const express = require("express");
const { signin } = require("./userControllers");
const passport = require("passport");
const upload = require("../../middleware/multer");

const router = express.Router();
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
