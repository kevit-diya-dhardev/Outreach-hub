const express = require("express");

//requiring imports
const router = express.Router();
const { login, logout } = require("../controllers/adminAuth");
const admin = require("../controllers/admin");

//auth
router.post("/login", login);
router.get("/logout", logout);

//createAdmin
router.post("/", admin.createAdmin);

module.exports = router;
