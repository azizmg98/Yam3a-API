const Guest = require("../../models/Guest");

exports.fetchGuests = async (req, res, next) => {
  try {
    const guests = await Guest.find().populate("user").populate("gatherings");
    return res.json(guests);
  } catch (error) {
    next(error);
  }
};

exports.changeStatus = async (req, res, next) => {
  try {
    await Guest.findByIdAndUpdate();
  } catch (error) {
    next(error);
  }
};
