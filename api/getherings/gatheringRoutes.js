const express = require("express");
const { fetchGatherings } = require("./gatheringControllers");

const router = express.Router();

router.get("/gatherings", fetchGatherings);
router.post("/gatherings", signup);

module.exports = router;
