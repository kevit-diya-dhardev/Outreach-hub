const Message = require("../models/message");
const { default: mongoose } = require("mongoose");
const createMessage = (req, res) => {
  const newMessage = new Message({
    name: req.body.name,
    type: req.body.type,
    message: {
      text: req.body.message.text,
      imageUrl: req.body.message.imageUrl,
    },
    workspace_id: req.userData.workspace_id,
    createdBy: req.userData.id,
  });
  newMessage
    .save()
    .then((response) => {
      return res.status(200).json({
        response,
        message: "Message template successfully created!!",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

const getMessages = (req, res) => {
  Message.find({ createdBy: req.userData.id })
    .exec()
    .then((response) => {
      if (response.length < 1) {
        res.status(200).josn({ message: "No message template created by you" });
      } else {
        res.status(200).json({ response });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

const getSinleMessage = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.message_id)) {
    throw new Error("Invalid id!");
  }
  Message.findOne({
    createdBy: req.userData.id,
    _id: req.params.message_id,
  })
    .exec()
    .then((response) => {
      if (!response) {
        res
          .status(404)
          .json({ message: "No message template exists with this id!" });
      } else {
        res.status(200).json({ response });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const updateMessage = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.message_id)) {
    throw new Error("Invalid id!");
  }
  const id = req.params.message_id;
  Message.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        type: req.body.type,
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
          .json({ message: "Message updated successfully!", response });
      } else {
        res.status(404).json({ message: "No message found with this id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

const deleteMessage = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.message_id)) {
    throw new Error("Invalid id!");
  }
  Message.deleteOne({ _id: req.params.message_id })
    .exec()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

module.exports = {
  createMessage,
  getMessages,
  getSinleMessage,
  updateMessage,
  deleteMessage,
};
