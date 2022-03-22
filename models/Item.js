const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  selectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  gathering: { type: mongoose.Schema.Types.ObjectId, ref: "Gathering" },
});

module.exports = mongoose.model("Item", ItemSchema);
