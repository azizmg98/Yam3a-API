const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const UserScheema = new mongoose.Schema({
  username: {
    type: String,
    required: "username missing",
    unique: "username is taken",
  },
  password: { type: String, required: "password missing" },
  phone: { type: Number, required: "Phone missing" },
});

module.exports = mongoose.model("User", UserScheema);
