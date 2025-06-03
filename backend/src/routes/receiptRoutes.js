const express = require('express');
const router = express.Router();
const { receiveReceipt } = require('../controllers/receiptController');

// Vendor calls this to notify delivery status
router.post('/', receiveReceipt);

module.exports = router;