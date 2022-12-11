const db = require("../models");
const Class = db.class;
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.list = (req, res) => {
  Class.find({})
    .exec((err, classes  ) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!classes) {
        return res.status(404).send({ message: "Class Not found." });
      }

      res.status(200).send({
        results: classes,
        count: classes.length
      });
    });
};
