const express = require("express");
const userRoutes = require("./users/userRoutes");
const gatheringRoutes = require("./getherings/gatheringRoutes");
const router = express.Router();

router.use("/authenticate", userRoutes);
router.use("/gatherings", gatheringRoutes);
// router.use("/locations", locationRoutes)
// router.use("/items", itemRoutes)

module.exports = router;
