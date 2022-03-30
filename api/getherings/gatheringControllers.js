const Gathering = require("../../models/Gathering");
const Guest = require("../../models/Guest");

const { ObjectId } = require("mongodb");

exports.fetchGatherings = async (req, res, next) => {
  try {
    const gatherings = await Gathering.find()
      .populate("location")
      .populate("guests")
      .populate("items");
    return res.json(gatherings);
  } catch (error) {
    next(error);
  }
};

exports.fetchSingleGathering = async (req, res, next) => {
  try {
    const { gatheringId } = req.params;
    const gathering = await Gathering.findById(gatheringId)
      .populate("location")
      .populate("guests")
      .populate("items");
    return res.json(gathering);
  } catch (error) {
    next(error);
  }
};

exports.fetchHostGathering = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const gatherings = await Gathering.find({ host: userId }).populate(
      "guests"
    );
    return res.json(gatherings);
  } catch (error) {
    next(error);
  }
};

exports.updateGathering = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.deleteGathering = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// add guest to gathering. guest create when signing up
exports.addGuest = async (req, res, next) => {
  try {
    //? create guest with sign up
    const gatheringId = req.body.gatherings;
    const userId = req.body.user;

    // todo add validation. don't duplicate guests
    // * find guest by user and push gathering id
    const guest = await Guest.findOneAndUpdate(
      { user: userId },
      {
        $push: { gatherings: gatheringId },
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
