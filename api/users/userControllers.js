const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const User = require("../../models/User");

const secret = process.env.JWT_SECRET;
const exp = process.env.JWT_EXPIRATION;

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create(req.body);
    const payload = {
      _id: newUser._id,
      username: newUser.username,
      exp: Date.now() + exp,
    };
    const token = jwt.sign(JSON.stringify(payload), secret);
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async () => {};

exports.getUsers = async () => {};
