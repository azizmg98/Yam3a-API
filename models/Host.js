const mongoose = require("mongoose");

const HostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  gathering: { type: mongoose.Schema.Types.ObjectId, ref: "Gathering" },
  status: { type: Boolean, default: false },
});

module.exports = mongoose.model("Host", HostSchema);
