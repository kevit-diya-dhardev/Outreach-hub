const mongoose = require("mongoose");

//workspaceSchema
const workspaceSchema = mongoose.Schema({
  workspace_id: {
    type: String,
  },
  workspace_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    ref: "Admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Workspace = mongoose.model("Workspace", workspaceSchema);
module.exports = { Workspace };
