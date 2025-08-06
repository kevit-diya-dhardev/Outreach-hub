const jwt = require("jsonwebtoken");
const { Workspace } = require("../models/workspaces");
const { default: mongoose } = require("mongoose");
const { response } = require("../../app");

// create workspace

const createWorkspace = (req, res) => {
  Workspace.findOne({ workspace_id: req.body.workspace_id })
    .exec()
    .then((response) => {
      if (response) {
        res.status(409).json({ message: "Workspace already exists!" });
      } else {
        const newWorkspace = new Workspace({
          workspace_id: req.body.workspace_id,
          workspace_name: req.body.workspace_name,
          description: req.body.description,
          createdBy: req.userData.id,
        });
        newWorkspace
          .save()
          .then((response) => {
            res.status(200).json({
              message: "Workspace created successfully!!",
              response: response,
            });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

//get workspaces

const getWorkspaces = (req, res) => {
  Workspace.find()
    .exec()
    .then((response) => {
      if (response.length >= 1) {
        res.status(200).json({ response });
      } else {
        res.status(200).json({ message: "No workspaces found!!!" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//get single workspace

const getSingleWorkspace = (req, res) => {
  const id = req.body.workspace_id;
  Workspace.findOne({ workspace_id: id })
    .exec()
    .then((response) => {
      if (response) {
        res.status(200).json({ response });
      } else {
        res.status(404).json({ message: "No workspace exists with this id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

//update workspaces

const updateWorkspace = (req, res) => {
  const id = req.params.workspace_id;
  Workspace.findOneAndUpdate(
    { workspace_id: id },
    {
      $set: {
        workspace_name: req.body.workspace_name,
        description: req.body.description,
      },
    },
    { returnDocument: "after" }
  )
    .exec()
    .then((response) => {
      res
        .status(200)
        .json({ message: "Workspace updated successfully!", response });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

// delete workspace
const deleteWorkspace = (req, res) => {
  const id = req.body.workspace_id;
  Workspace.findOne({ workspace_id: id })
    .exec()
    .then((response) => {
      if (response) {
        Workspace.deleteOne({ workspace_id: id })
          .exec()
          .then((response) => {
            res.status(200).json({ message: "Workspace deleted successfully" });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      } else {
        res.status(404).json({ error: "Workspace doesn't exist!!" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};
module.exports = {
  createWorkspace,
  deleteWorkspace,
  getWorkspaces,
  updateWorkspace,
  getSingleWorkspace,
};
