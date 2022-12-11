const multer = require("multer");
var path = require('path');
var crypto = require('crypto');

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, res) => {
          if (err) return cb(err);
  
          return cb(null, res.toString('hex') + path.extname(file.originalname));
        });
    },
  }),
};
