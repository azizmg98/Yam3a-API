const Gathering = require("../../models/Gathering");

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
    // req.body.host = req.user._id;
    const { userId } = req.params;

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

// exports.addGuestsToGathering = async (req, res, next) => {
//   try {
//     const {gatheringId} = req.params;
//  const addGuests = await Gathering.aggregate

//   } catch (error) {}
// };

exports.fetchUserGatherings = async (req, res, next) => {
  // const gatherings = [];
  try {
    const { userId } = req.params;
    const foundGatherings = Gathering.filter(
      (gathering) => +gathering.host._id === +userId
    );
    console.log(foundGatherings);
    return res.json(foundGatherings);
    // if (foundGatherings) {
    //   return res.status(204).end();
    // } else {
    //   return res.status(404).json({ message: "Product not found" });
    // }
  } catch (error) {}
};
