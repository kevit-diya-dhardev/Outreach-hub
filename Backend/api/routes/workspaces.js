const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createWorkspace,
  deleteWorkspace,
  getWorkspaces,
  getSingleWorkspace,
  updateWorkspace,
} = require("../controllers/workspaces");

//routes to handle CRUD operations on workspaces

//Create workspace
router.post("/", auth, createWorkspace);

//Delete workspace
router.delete("/", auth, deleteWorkspace);

//get all workspaces
router.get("/", auth, getWorkspaces);

//Update workspace
router.put("/:workspace_id", auth, updateWorkspace);

//get single workspace
router.get("/:workspace_id", auth, getSingleWorkspace);

module.exports = router;
