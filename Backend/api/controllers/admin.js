const admin = require("../models/admin");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

//create admin
exports.createAdmin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const newAdmin = new admin({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        password: hash,
      });
      newAdmin
        .save()
        .then((response) => {
          res
            .status(200)
            .json({ message: "User created successfully", response: response });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
