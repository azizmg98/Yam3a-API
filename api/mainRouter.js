const express = require("express");
const userRoutes = require("./users/userRoutes");
const gatheringRoutes = require("./getherings/gatheringRoutes");
const locationRoutes = require("./locations/locationRoutes");
const itemRoutes = require("./items/ItemRoutes");
const router = express.Router();

router.use("/authenticate", userRoutes);
router.use("/gatherings", gatheringRoutes);
router.use("/locations", locationRoutes);
router.use("/items", itemRoutes);

module.exports = router;
