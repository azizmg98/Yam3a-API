const Location = require("../../models/Location");

exports.fetchLocations = async (req, res, next) => {
  try {
    const locations = await Location.find().populate("user");
    return res.json(locations);
  } catch (error) {
    next(error);
  }
};

exports.getHostLocations = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const locations = await Location.find({ user: userId });
    return res.json(locations);
  } catch (error) {}
};
