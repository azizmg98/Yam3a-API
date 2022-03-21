const Gathering = require("../../models/Gathering");

exports.fetchGatherings = async (req, res, next) => {
  try {
    const gatherings = await Gathering.find();
    return res.json(gatherings);
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
    const newGathering = await Gathering.create(req.body);
    return res.status(201).json(newGathering);
  } catch (error) {
    next(error);
  }
};

// title: {
//     type: String,
//     required: true,
//   },
//   host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   date: { type: String },
//   time: { type: String },
//   guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
//   items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],

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
