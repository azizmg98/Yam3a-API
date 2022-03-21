const user = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signin = (req, res, next) => {
  try {
    const newUser = req.user;

    const payLoad = {
      _id: newUser._id,
      username: newUser.username,
      exp: Date.now() + +process.env.EXPTIMER, //2hr
    };

    const token = jwt.sign(JSON.stringify(payLoad), process.env.SECRET_KEY);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
