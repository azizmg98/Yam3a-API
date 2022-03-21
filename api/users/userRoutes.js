const express = require("express");
const { signin, signup } = require("./userControllers");
const passport = require("passport");
const upload = require("../../middleware/multer");

const router = express.Router();

router.param("userId", async (req, res, next, userId) => {
  const user = await fetchUser(userId, next);
  if (user) {
    req.user = user;
    next();
  } else {
    const err = new Error("user Not Found");
    err.status = 404;
    next(err);
  }
});

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.post("/signup", signup);

module.exports = router;
