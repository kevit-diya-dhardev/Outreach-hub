const express = require("express");
const {
  createCampaign,
  getCampaigns,
  getSingleCampaign,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaigns");
const { auth } = require("../middleware/userAuth");
const router = express.Router();

router.post("/", auth, createCampaign);

router.get("/", auth, getCampaigns);

router.get("/:campaign_id", auth, getSingleCampaign);

router.put("/:campaign_id", auth, updateCampaign);

router.delete("/:campaign_id", auth, deleteCampaign);

module.exports = router;
