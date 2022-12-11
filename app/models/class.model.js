const mongoose = require("mongoose");

const Class = mongoose.model(
  "Class",
  new mongoose.Schema({
    index: String,
    name: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
  })
);

module.exports = Class;
