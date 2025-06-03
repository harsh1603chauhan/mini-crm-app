const Customer = require('../models/Customer');
const jsonLogic = require('json-logic-js');

exports.previewSegment = async (req, res) => {
  try {
   
    const { rules } = req.body;
    if (!rules) return res.status(400).json({ error: 'Rules are required.' });


    const customers = await Customer.find();

    const matched = customers.filter(cust => jsonLogic.apply(rules, cust.toObject()));


    res.json({ size: matched.length });
  } catch (err) {
    console.error('Preview error:', err);
    res.status(500).json({ error: 'Failed to preview segment.' });
  }
};