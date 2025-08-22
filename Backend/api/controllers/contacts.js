require("mongoose");
const { Workspace } = require("../models/workspaces");
const Contact = require("../models/contacts");
// create contact

const createContact = (req, res) => {
  Workspace.findOne({ workspace_id: req.body.workspace_id })
    .exec()
    .then((response) => {
      if (response) {
        Contact.findOne({ phoneNumber: req.body.phoneNumber })
          .exec()
          .then((response) => {
            if (response) {
              return res
                .status(409)
                .json({ message: "Contact with this number already exists" });
            } else {
              const newContact = new Contact({
                workspace_id: req.body.workspace_id,
                contact_name: req.body.contact_name,
                phoneNumber: req.body.phoneNumber,
                createdBy: req.userData.id,
                tags: req.body.tags,
              });
              newContact
                .save()
                .then((response) => {
                  res.status(200).json({
                    message: "Contact created successfully!",
                    response,
                  });
                })
                .catch((error) => {
                  res.status(500).json({
                    error,
                  });
                });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      } else {
        return res
          .status(404)
          .json({ message: "Workspace with this id doesn't exists!" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

//get contact
const getContacts = (req, res) => {
  Contact.find({})
    .exec()
    .then((response) => {
      if (response.length >= 1) {
        res.status(200).json({
          response,
        });
      } else {
        res.status(200).json({ message: "No contacts found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//get single contact
const getSingleContact = (req, res) => {
  const id = req.params.contact_id;
  Contact.findOne({ _id: id })
    .exec()
    .then((response) => {
      if (response) {
        res.status(200).json({ response });
      } else {
        res
          .status(404)
          .json({ message: "contact with this id does not exists!" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

//update user
const updateContact = (req, res) => {
  const id = req.params.contact_id;
  Contact.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        contact_name: req.body.contact_name,
        phoneNumber: req.body.phoneNumber,
        tags: req.body.tags,
      },
    },
    { returnDocument: "after" }
  )
    .exec()
    .then((response) => {
      if (response) {
        res
          .status(200)
          .json({ message: "Contact updated successfully!", response });
      } else {
        res.status(404).json({ message: "No contact found with this id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

// delete user
const deleteContact = (req, res) => {
  const id = req.params.contact_id;
  Contact.findOne({ _id: id })
    .exec()
    .then((response) => {
      if (response) {
        Contact.deleteOne({ _id: id })
          .exec()
          .then((response) => {
            res
              .status(200)
              .json({ message: "Contact deleted successfully", response });
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      } else {
        res.status(404).json({ message: "No contact found with this id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

module.exports = {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
  getSingleContact,
};
