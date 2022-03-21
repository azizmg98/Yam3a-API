const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const Location = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Gathering" },
});

module.exports = mongoose.model("Location", Location);
