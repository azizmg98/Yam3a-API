const express = require("express");
const passport = require("passport");
const {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
} = require("./ItemControllers");

const router = express.Router();

// fetch all items
router.get("/", fetchItems);

// create a item
router.post("/", passport.authenticate("jwt", { session: false }), createItem);

// update an item
router.put("/", passport.authenticate("local", { session: false }), updateItem);

// delete a item
router.delete("/:itemId", deleteItem);

// export item router
module.exports = router;
