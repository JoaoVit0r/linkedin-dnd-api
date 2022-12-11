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
    },
    levels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Level"
      }
    ]
  })
);

module.exports = Class;
