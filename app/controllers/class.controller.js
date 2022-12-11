const db = require("../models");
const Class = db.class;
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  const { index, name } = req.body;

  if (!index || !name) {
    res.status(400).send({ message: "Invalid class attributes" });
    return;
  }

  Class.exists({ index }, (err, exists) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (exists) {
      res.status(400).send({ message: "This class already exists" });
      return;
    }

    const classObj = new Class({
      index,
      name,
    });

    classObj.save((err, classObj) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "Class was registered successfully!" });
      return;
      // if (req.body.roles) {
      //   Role.find(
      //     {
      //       name: { $in: req.body.roles }
      //     },
      //     (err, roles) => {
      //       if (err) {
      //         res.status(500).send({ message: err });
      //         return;
      //       }

      //       classObj.roles = roles.map(role => role._id);
      //       classObj.save(err => {
      //         if (err) {
      //           res.status(500).send({ message: err });
      //           return;
      //         }

      //         res.send({ message: "User was registered successfully!" });
      //       });
      //     }
      //   );
      // } else {
      //   Role.findOne({ name: "user" }, (err, role) => {
      //     if (err) {
      //       res.status(500).send({ message: err });
      //       return;
      //     }

      //     classObj.roles = [role._id];
      //     classObj.save(err => {
      //       if (err) {
      //         res.status(500).send({ message: err });
      //         return;
      //       }

      //       res.send({ message: "User was registered successfully!" });
      //     });
      //   });
      // }
    });
  });
};

exports.list = (req, res) => {
  Class.find({}).exec((err, classes) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!classes) {
      return res.status(404).send({ message: "Class Not found." });
    }

    res.status(200).send({
      results: classes,
      count: classes.length,
    });
  });
};
