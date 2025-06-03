const express = require('express');
const router = express.Router();
const { createCampaign, listCampaigns, getCampaignDeliveryLogs } = require('../controllers/campaignController');

router.post('/', createCampaign);
router.get('/', listCampaigns);
router.get('/:campaignId/logs', getCampaignDeliveryLogs);

module.exports = router;