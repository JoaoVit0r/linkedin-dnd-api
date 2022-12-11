const mongoose = require("mongoose");

const Class = mongoose.model(
  "Class",
  new mongoose.Schema({
    index: String,
    name: String
  })
);

module.exports = Class;
