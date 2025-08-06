const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Bad Auth", err });
    }
    req.userData = decoded;
    res.status(200);
  });
  next();
};
module.exports = verifyToken;
