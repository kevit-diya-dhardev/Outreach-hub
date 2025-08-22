const express = require("express");
const { auth } = require("../middleware/userAuth");
const {
  createMessage,
  getMessages,
  getSinleMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/messages");
const router = express.Router();

router.post("/", auth, createMessage);

router.get("/", auth, getMessages);

router.get("/:message_id", auth, getSinleMessage);

router.put("/:message_id", auth, updateMessage);

router.delete("/:message_id", auth, deleteMessage);

module.exports = router;
