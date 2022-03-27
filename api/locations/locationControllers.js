const Gathering = require("../../models/Gathering");
const Location = require("../../models/Location");

exports.fetchLocations = async (req, res, next) => {
  try {
    const locations = await Location.find().populate("user");
    return res.json(locations);
  } catch (error) {
    next(error);
  }
};

exports.updateLocation = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
exports.deleteLocation = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
