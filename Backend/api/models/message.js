const mongoose = require("mongoose");
const subMessageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    imageUrl: { type: String },
  },
  { _id: false }
);

const messageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Text", "Text-Image"],
    required: true,
    default: "Text",
  },
  message: subMessageSchema,
  workspace_id: { type: String, ref: "Workspace", required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
