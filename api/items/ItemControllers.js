const Item = require("../../models/Item");

exports.fetchItems = async (req, res, next) => {
  try {
    const items = await Item.find();
    return res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.createItem = async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body);
    return res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
exports.deleteItem = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
