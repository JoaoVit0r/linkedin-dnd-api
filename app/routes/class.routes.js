const { authJwt, multer: multerMiddleware } = require("../middlewares");
const controller = require("../controllers/class.controller");
const multer = require("multer");

const upload = multer({storage: multerMiddleware.storage});

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/classes", [authJwt.verifyToken], controller.list);

  app.post("/api/classes", [authJwt.verifyToken, authJwt.isAdmin, upload.single('image')], controller.create);

};
