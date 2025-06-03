const Customer = require('../models/Customer');
const jsonLogic = require('json-logic-js');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.post('/preview', ensureAuthenticated, async (req, res) => {
  const { rules } = req.body;

  if (!rules) {
    return res.status(400).json({ error: 'Rules are required for preview' });
  }

  try {
    const allCustomers = await Customer.find();
    // Always use .toObject()!
    const matched = allCustomers.filter(customer =>
      jsonLogic.apply(rules, customer.toObject())
    );
    res.json({ size: matched.length });
  } catch (error) {
    console.error('Preview error:', error);
    res.status(500).json({ error: 'Failed to fetch audience preview' });
  }
});

module.exports = router;