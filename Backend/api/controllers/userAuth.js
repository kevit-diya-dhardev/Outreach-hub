const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//login Auth
const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .exec()
    .then((response) => {
      if (response) {
        const id = response._id;
        const workspace_id = response.workspace_id;
        bcrypt.compare(password, response.password, (error, result) => {
          if (error) {
            return res.status(500).json({
              error,
            });
          }
          if (result) {
            const token = jwt.sign(
              { email, id, workspace_id },
              process.env.JWT_KEY,
              {
                expiresIn: "10h",
              }
            );
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
        error,
      });
    });
};

//logout Auth

const logout = (req, res) => {
  res.send("Success");
};
module.exports = { login, logout };
