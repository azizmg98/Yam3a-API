const mongoose = require("mongoose");

const GatheringSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // use datatype date instead of string
    date: { type: String },
    time: { type: String },
    image: { type: String },
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      default: null,
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gathering", GatheringSchema);
