const express = require('express');
const router = express.Router();
const { ingestCustomer } = require('../controllers/customerController');

// Ingest customer data (API layer: validate & enqueue)
router.post('/', ingestCustomer);

module.exports = router;