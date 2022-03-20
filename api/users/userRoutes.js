const express = require("express");
const { signin, signup, getUsers } = require("./userControllers");

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

router.post("/signup", signup);

module.exports = router;
