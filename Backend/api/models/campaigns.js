const mongoose = require("mongoose");

const campaignSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Running", "Completed"],
      default: "Draft",
    },
    selectedTags: [
      {
        type: String,
        required: true,
      },
    ],
    message: {
      type: {
        type: String,
        enum: ["Text", "Text-Image"],
        default: "Text",
        required: true,
      },
      text: { type: String, required: true },
      imageUrl: { type: String },
    },
    launchedAt: {
      type: Date,
    },
    workspace_id: { type: String, required: true, ref: "Workspace" },
    createdBy: { type: String, required: true, ref: "User" },
    messagePerContact: [
      {
        contact_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Contact",
        },
        messageContent: { type: String },
        sentAt: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Campaigns = mongoose.model("Campaigns", campaignSchema);
module.exports = Campaigns;
