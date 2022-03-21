const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    // next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    return res.json(deletedUser);
  } catch (error) {
    next(error);
  }
};
