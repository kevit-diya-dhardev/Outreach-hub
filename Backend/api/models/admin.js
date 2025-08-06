const mongoose = require("mongoose");

//admin schema
const adminSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
