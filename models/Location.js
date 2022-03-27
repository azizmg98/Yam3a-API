const mongoose = require("mongoose");

const Location = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Location", Location);
