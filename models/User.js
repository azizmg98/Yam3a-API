const mongoose = require("mongoose");

// const mongooseSlugPlugin = require("mongoose-slug-plugin");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: "Username is taken" },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  image: { type: String },
  hosted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gathering" }],
  invitations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gathering" }],
  accepted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gathering" }],
  locations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
});

module.exports = mongoose.model("User", UserSchema);
