const mongoose = require("mongoose");

// const mongooseSlugPlugin = require("mongoose-slug-plugin");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  image: { type: String },
  hosted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gathering" }],
  invitations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gathering" }],
  accepted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gathering" }],
});

module.exports = mongoose.model("User", UserSchema);
