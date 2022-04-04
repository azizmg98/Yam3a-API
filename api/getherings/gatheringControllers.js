const Gathering = require("../../models/Gathering");
const Guest = require("../../models/Guest");
const User = require('../../models/User')

exports.fetchGatherings = async (req, res, next) => {
  try {
    const gatherings = await Gathering.find()
      .populate("location")
      .populate("guests")
    return res.json(gatherings);
  } catch (error) {
    next(error);
  }
};

exports.fetchHostGathering = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const gatherings = await Gathering.find({ host: userId }).populate({
      path: "guests",
      populate: {
        path: "user",
      },
    });
    return res.json(gatherings);
  } catch (error) {
    next(error);
  }
};

exports.createGathering = async (req, res, next) => {
  try {
    const userId = req.user._id;
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

// add guest to gathering. guest created when signing up
exports.addGuest = async (req, res, next) => {
  try {
    //? create guest with sign up
    const gatheringId = req.body.gatherings;
    const userId = req.body.user;

    // todo add validation. don't duplicate guests
    // * find guest by user and push gathering id
    const guest = await Guest.findByIdAndUpdate(
      userId,
      {
        $push: { gathering: gatheringId },
      },
      { new: true }
    );
    // * find gathering and push guest
    await Gathering.findByIdAndUpdate(
      gatheringId,
      {
        $push: { guests: guest._id },
      },
      { new: true }
    );

    return res.status(201).json(guest);
  } catch (error) {
    next(error);
  }
};
