const express = require('express');
const router = express.Router();
const { ingestOrder } = require('../controllers/orderController');

// Ingest order data (API layer: validate & enqueue)
router.post('/', ingestOrder);

module.exports = router;