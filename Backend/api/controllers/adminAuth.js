const admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//login Auth
const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  admin
    .findOne({ username: username })
    .exec()
    .then((response) => {
      if (response) {
        const id = response._id;
        bcrypt.compare(password, response.password, (error, result) => {
          if (error) {
            return res.status(500).json({
              error: error,
            });
          }
          if (result) {
            const token = jwt.sign({ username, id }, process.env.JWT_KEY, {
              expiresIn: "1h",
            });
            res.status(200).json({
              message: "Auth successfull",
              token: token,
            });
          } else {
            res.status(401).json({ error: "Auth failed!" });
          }
        });
      } else {
        res.status(401).json({
          error: "Auth failed",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

//logout Auth

const logout = (req, res) => {
  res.send("Success");
};
module.exports = { login, logout };
