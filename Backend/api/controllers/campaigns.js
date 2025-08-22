const { default: mongoose } = require("mongoose");
const Campaigns = require("../models/campaigns");
const { response } = require("../../app");

const createCampaign = (req, res) => {
  const newCampaign = new Campaigns({
    name: req.body.name,
    description: req.body.description,
    selectedTags: req.body.selectedTags,
    message: req.body.message,
    workspace_id: req.userData.workspace_id,
    createdBy: req.userData.id,
  });
  newCampaign
    .save()
    .then((response) => {
      res
        .status(201)
        .json({ message: "Campaign created successfully!", response });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
const getCampaigns = (req, res) => {
  Campaigns.find({ createdBy: req.userData.id })
    .exec()
    .then((response) => {
      if (response.length < 1) {
        res.status(200).json({ message: "No campaigns found!" });
      } else {
        res.status(200).json({ response });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const getSingleCampaign = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.campaign_id)) {
    throw new Error("ObjectId is not valid!");
  } else {
    Campaigns.findOne({ _id: req.params.campaign_id })
      .exec()
      .then((response) => {
        if (!response) {
          res
            .status(200)
            .json({ message: "No campaign exists with this objectId!" });
        } else {
          res.status(200).json({ response });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
};

const updateCampaign = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.campaign_id)) {
    throw new Error("Invalid id!");
  }
  const id = req.params.campaign_id;
  Campaigns.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        selectedTags: req.body.selectedTags,
        message: req.body.message,
      },
    },
    { returnDocument: "after" }
  )
    .exec()
    .then((response) => {
      if (response) {
        res
          .status(200)
          .json({ message: "Campaign updated successfully!", response });
      } else {
        res.status(404).json({ message: "No campaign found with this id!!" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

const deleteCampaign = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.campaign_id)) {
    throw new Error("ObjectId is not valid!");
  } else {
    Campaigns.deleteOne({ _id: req.params.campaign_id })
      .exec()
      .then((response) => {
        res.status(200).json({ response });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
};

module.exports = {
  createCampaign,
  getCampaigns,
  getSingleCampaign,
  updateCampaign,
  deleteCampaign,
};
