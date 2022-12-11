const mongoose = require("mongoose");

const Level = mongoose.model(
  "Level",
  new mongoose.Schema({
    index: String,
    level: String,
    features: String
  })
);

module.exports = Level;
