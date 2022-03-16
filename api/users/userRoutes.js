const express = require("express");
const { signin, signup, getUsers } = require("./userControllers");

const router = express.Router();
