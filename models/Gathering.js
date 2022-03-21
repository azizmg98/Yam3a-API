const mongoose = require("mongoose");

const GatheringSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: String },
  time: { type: String },
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

module.exports = mongoose.model("Gathering", GatheringSchema);
