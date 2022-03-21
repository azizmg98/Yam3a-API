const Gathering = require("../../models/Gathering");
const Location = require("../../models/Location");

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

exports.createGathering = async (req, res, next) => {
  try {
    req.body.host = req.user._id;

    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const newGathering = await Gathering.create(req.body)
      .populate("location")
      .populate("guests")
      .populate("items");

    return res.status(201).json(newGathering);
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
