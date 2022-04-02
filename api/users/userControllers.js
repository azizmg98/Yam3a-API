const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Gathering = require("../../models/Gathering");
const secret = process.env.JWT_SECRET;
const exp = +process.env.JWT_EXPIRATION;
const Location = require("../../models/Location");
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

exports.fetchSingleUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
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

exports.createGathering = async (req, res, next) => {
  try {
    const { userId } = req.params;
    req.body.host = userId;
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const newGathering = await Gathering.create(req.body);
    await User.findByIdAndUpdate(userId, {
      $push: { hosted: newGathering._id },
    });
    return res.status(201).json(newGathering);
  } catch (error) {
    next(error);
  }
};

// create a location

exports.createLocation = async (req, res, next) => {
  try {
    const { userId } = req.params;
    req.body.user = userId;
    const newLocation = await Location.create(req.body);
    await User.findByIdAndUpdate(userId, {
      $push: { locations: newLocation._id },
    });
    return res.status(201).json(newLocation);
  } catch (error) {
    next(error);
  }
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
