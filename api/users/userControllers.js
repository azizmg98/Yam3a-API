const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const secret = process.env.JWT_SECRET;
const exp = +process.env.JWT_EXPIRATION;
const Guest = require("../../models/Guest");

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

    // create guest
    await Guest.create({ user: newUser._id });

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
      exp: Date.now() + exp, //2hr
    };

    const token = jwt.sign(JSON.stringify(payLoad), secret);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.json(users);
  } catch (error) {}
};

exports.updateProfileImage = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { image: req.body.image },
      {
        new: true,
      }
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
