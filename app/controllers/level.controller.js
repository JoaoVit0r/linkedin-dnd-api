const db = require("../models");
const Class = db.class;
const Level = db.level;

const fs = require("fs");
const path = require("path");

exports.list = (req, res) => {
  const index = req.params.classIndex;

  Class.findOne({ index })
    .populate("levels", "-__v")
    .exec((err, classObj) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!classObj) {
        res.status(404).send({ message: "This class not exists" });
        return;
      }

      const levels = classObj.levels;
      if (!levels) {
        return res.status(200).send({
          results: [],
          count: 0,
        });
      }

      res.status(200).send({
        results: levels,
        count: levels.length,
      });

      // Level.find({}).exec((err, levels) => {
      //   if (err) {
      //     res.status(500).send({ message: err });
      //     return;
      //   }

      //   if (!levels) {
      //     return res.status(404).send({ message: "Levels Not found." });
      //   }

      //   res.status(200).send({
      //     results: levels,
      //     count: levels.length,
      //   });
      // });
    });
};
