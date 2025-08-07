const express = require("express");
const router = express.Router();
const auth = require("../middleware/adminAuth");
const { login, logout } = require("../controllers/userAuth");
const {
  createUser,
  deleteUser,
  getUsers,
  getSingleUser,
  updateUser,
} = require("../controllers/users");

router.post("/login", login);
router.get("/logout", logout);

//routes to handle CRUD operations on users

//Create user
router.post("/", auth, createUser);

//Delete user
router.delete("/:user_id", auth, deleteUser);

//get all users
router.get("/", auth, getUsers);

//Update user
router.put("/:user_id", auth, updateUser);

//get single user
router.get("/:user_id", auth, getSingleUser);

module.exports = router;
