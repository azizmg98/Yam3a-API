const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  gatherings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gathering" }],
  status: { type: Boolean },
});

module.exports = mongoose.model("Guest", GuestSchema);
