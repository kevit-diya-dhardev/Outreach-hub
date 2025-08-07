const mongoose = require("mongoose");

//contactSchema
const contactSchema = mongoose.Schema({
  contact_name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  workspace_id: {
    type: "String",
    ref: "Workspace",
  },
  createdBy: {
    type: String,
    ref: "User",
  },
});

const contact = mongoose.model("Contact", contactSchema);
module.exports = contact;
