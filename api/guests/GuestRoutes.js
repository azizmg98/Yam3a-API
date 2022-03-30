const express = require("express");
const passport = require("passport");
const { changeStatus, fetchGuests } = require("./GuestControllers");

const router = express.Router();

router.put("/status", changeStatus);

router.get("/", fetchGuests);

// export item router
module.exports = router;
