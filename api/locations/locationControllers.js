const Location = require("../../models/Location");

exports.fetchLocations = async (req, res, next) => {
  try {
    const locations = await Location.find().populate("user");
    return res.json(locations);
  } catch (error) {
    next(error);
  }
};

exports.createLocation = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    req.body.coordinates = "1234567890";
    const newLocation = await Location.create(req.body);
    return res.status(201).json(newLocation);
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
