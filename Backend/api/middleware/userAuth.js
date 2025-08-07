const jwt = require("jsonwebtoken");
const User = require("../models/users");

const auth = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header.split(" ")[1];

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Bad Auth", err });
    }
    User.findOne({ _id: decoded.id })
      .exec()
      .then((response) => {
        if (response) {
          req.userData = decoded;
          res.status(200);
          next();
        } else {
          return res.status(404).json({ message: "User not found!" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "Bad Auth" });
      });
  });
};
module.exports = { auth };
