const mongoose = require("mongoose");

const UserScheema = new mongoose.Schema({
  username: {
    type: String,
    required: "username missing",
    unique: "username is taken",
  },
  password: { type: String, required: "password missing" },
});
