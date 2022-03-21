const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  gathering: { type: mongoose.Schema.Types.ObjectId, ref: "Gathering" },
  selected: { type: Boolean },
});

module.exports = mongoose.model("Item", ItemSchema);
