const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/userAuth");
const {
  createContact,
  deleteContact,
  getContacts,
  getSingleContact,
  updateContact,
} = require("../controllers/contacts");

//routes to handle CRUD operations on users

//Create user
router.post("/", auth, createContact);

//Delete user
router.delete("/:contact_id", auth, deleteContact);

//get all users
router.get("/", auth, getContacts);

//Update user
router.put("/:contact_id", auth, updateContact);

//get single user
router.get("/:contact_id", auth, getSingleContact);

module.exports = router;
