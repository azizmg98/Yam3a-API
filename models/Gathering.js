const mongoose = require("mongoose");

const GatheringSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: String },
    time: { type: String },
    image: { type: String },
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Guest" }],
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gathering", GatheringSchema);
