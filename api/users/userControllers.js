const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Gathering = require("../../models/Gathering");
const secret = process.env.JWT_SECRET;
const exp = +process.env.JWT_EXPIRATION;

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
    const users = await User.find().populate("hosted");
    return res.json(users);
  } catch (error) {
    // next(error);
  }
};

exports.fetchSingleUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("locations");
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    // const { userId } = req.params;
    // const deletedUser = await User.findById(userId);
    return res.json(req.user);
  } catch (error) {
    next(error);
  }
};

exports.editProfile = async (req, res, next) => {
  try {
    // const userId = req.params.userId;
    // const deletedUser = await User.findByIdAndDelete(userId);
    // return res.json(deletedUser);
  } catch (error) {
    next(error);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      req.body,
      { new: true, runValidators: true } // returns the updated product
    );
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
// exports.createGathering = async (req, res, next) => {
//   try {
//     req.body.host = req.user._id;

//     if (req.file) {
//       req.body.image = `/${req.file.path}`;
//       req.body.image = req.body.image.replace("\\", "/");
//     }
//     const newGathering = await Gathering.create(req.body)
//       .populate("location")
//       .populate("guests")
//       .populate("items");

//     return res.status(201).json(newGathering);
//   } catch (error) {
//     next(error);
//   }
// };
exports.createGathering = async (req, res, next) => {
  try {
    const { userId } = req.params;
    // adding id from params to product body
    req.body.user = userId;
    const newGathering = await Gathering.create(req.body);
    // push new product to shop
    await User.findByIdAndUpdate(userId, {
      $push: { hosted: newGathering._id },
    });
    return res.status(201).json(newGathering);
  } catch (error) {
    next(error);
  }
};
