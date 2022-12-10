const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  // Default to no user logged in
  req.session = null;
  req.user = null;
  // Helper method to clear a token and invoke the next middleware
  function clearTokenAndNext() {
    res.clearCookie("token");
    next();
  }
  // Read the cookie named 'token' and bail out if it doesn't exist
  const { token } = req.cookies;
  if (!token) {
    return clearTokenAndNext();
  }
  // Test the validity of the token
  jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
    if (err) {
      return clearTokenAndNext();
    }
    // Compare the token expiry (in seconds) to the current time (in milliseconds)
    // Bail out if the token has expired
    if (decodedToken.exp <= Date.now() / 1000) {
      return clearTokenAndNext();
    }
    // Read the session ID from the decoded token
    // and attempt to fetch the session by ID
    // Note: getSession retrieves the session (e.g. from Redis, Database, etc).
    const { sid: sessionId } = decodedToken;
    getSession(sessionId, (err, session) => {
      if (err) {
        return clearTokenAndNext();
      }
      // Attach the session and user objects to the request
      // (the following steps will access them)
      req.session = session;
      req.user = session.user;
      next();
    });
  });
  // let token = req.headers["x-access-token"];

  // if (!token) {
  //   return res.status(403).send({ message: "No token provided!" });
  // }

  // jwt.verify(token, process.env.SECRET, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).send({ message: "Unauthorized!" });
  //   }
  //   req.userId = decoded.id;
  //   next();
  // });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;
