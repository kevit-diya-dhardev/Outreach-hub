const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header.split(" ")[1];

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Bad Auth", err });
    }
    Admin.findOne({ _id: decoded.id })
      .exec()
      .then((response) => {
        if (response) {
          req.userData = decoded;
          res.status(200);
          next();
        } else {
          return res.status(404).json({ message: "Not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "Bad Auth" });
      });
  });
};
module.exports = verifyToken;
