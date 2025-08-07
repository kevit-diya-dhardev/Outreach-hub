const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const User = require("../models/users");
const { Workspace } = require("../models/workspaces");
const bcrypt = require("bcrypt");

// create User

const createUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((response) => {
      if (response) {
        res.status(409).json({ message: "User already exists!" });
      } else {
        Workspace.findOne({ workspace_id: req.body.workspace_id })
          .exec()
          .then((response) => {
            if (response) {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                  return res.status(500).json(err);
                }
                const newUser = new User({
                  id: new mongoose.Types.ObjectId(),
                  workspace_id: req.body.workspace_id,
                  email: req.body.email,
                  name: req.body.name,
                  password: hash,
                  role: req.body.role,
                });
                newUser
                  .save()
                  .then((response) => {
                    res.status(200).json({
                      message: "User created successfully!",
                      response,
                    });
                  })
                  .catch((error) => {
                    res.status(500).json({
                      error,
                    });
                  });
              });
            } else {
              res
                .status(404)
                .json({ message: "Workspace with this id doesn't exists!" });
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ error });
          });
      }
    });
};

//get users
const getUsers = (req, res) => {
  User.find({})
    .exec()
    .then((response) => {
      if (response.length >= 1) {
        res.status(200).json({
          response,
        });
      } else {
        res.status(200).json({ message: "No user found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//get single user
const getSingleUser = (req, res) => {
  const id = req.params.user_id;
  User.findOne({ _id: id })
    .exec()
    .then((response) => {
      if (response) {
        res.status(200).json({ response });
      } else {
        res.status(404).json({ message: "User with this id not found!" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

//update user
const updateUser = (req, res) => {
  const id = req.params.user_id;
  Workspace.findOne({ workspace_id: req.body.workspace_id })
    .exec()
    .then((response) => {
      if (response) {
        User.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              name: req.body.name,
              email: req.body.email,
              role: req.body.role,
              workspace_id: req.body.workspace_id,
            },
          },
          { returnDocument: "after" }
        )
          .exec()
          .then((response) => {
            res
              .status(200)
              .json({ message: "User updated successfully!", response });
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      } else {
        res
          .status(404)
          .json({ message: "No workspace exists with this userid" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// delete user
const deleteUser = (req, res) => {
  const id = req.params.user_id;
  User.findOne({ _id: id })
    .exec()
    .then((response) => {
      if (response) {
        User.deleteOne({ _id: id })
          .exec()
          .then((response) => {
            res
              .status(200)
              .json({ message: "User deleted successfully", response });
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      } else {
        res.status(404).json({ message: "No user found with this id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  getSingleUser,
};
