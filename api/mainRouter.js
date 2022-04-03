const express = require("express");
const userRoutes = require("./users/userRoutes");
const gatheringRoutes = require("./getherings/gatheringRoutes");
const locationRoutes = require("./locations/locationRoutes");
const guestRoutes = require("./guests/GuestRoutes");
const router = express.Router();

router.use("/authenticate", userRoutes);
router.use("/gatherings", gatheringRoutes);
router.use("/locations", locationRoutes);
router.use("/guests", guestRoutes);

module.exports = router;
