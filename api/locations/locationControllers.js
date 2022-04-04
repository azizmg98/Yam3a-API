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
