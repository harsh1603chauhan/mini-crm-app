const Campaign = require('../models/Campaign');
const Customer = require('../models/Customer');
const DeliveryLog = require('../models/DeliveryLog');
const jsonLogic = require('json-logic-js');

exports.createCampaign = async (req, res) => {
  try {
    const { name, segmentRules, createdBy, messageTemplate } = req.body;
    if (!name || !segmentRules || !createdBy)
      return res.status(400).json({ error: 'name, segmentRules, and createdBy are required.' });

    const campaign = await Campaign.create({
      name,
      segmentRules,
      createdBy,
      status: 'pending',
      stats: { sent: 0, failed: 0, audienceSize: 0 }
    });

    const customers = await Customer.find();
    if (!customers.length) return res.status(400).json({ error: 'No customers found.' });

   
    const matchedCustomers = customers.filter(cust =>
      jsonLogic.apply(segmentRules, cust.toObject())
    );

    console.log('Matched Customers:', matchedCustomers.length);

 
    let sent = 0, failed = 0;
    for (const customer of matchedCustomers) {
      const isSent = Math.random() < 0.9;
      await DeliveryLog.create({
        campaign: campaign._id,
        customer: customer._id,
        message: messageTemplate
          ? messageTemplate.replace('{name}', customer.name)
          : `Hi ${customer.name}, here’s 10% off on your next order!`,
        deliveryStatus: isSent ? 'SENT' : 'FAILED',
        deliveryTimestamp: new Date(),
        vendorResponse: { simulated: true }
      });
      if (isSent) sent++;
      else failed++;
    }

    campaign.stats.audienceSize = matchedCustomers.length;
    campaign.stats.sent = sent;
    campaign.stats.failed = failed;
    campaign.status = 'completed';
    await campaign.save();

    console.log('Campaign stats:', campaign.stats);

    res.status(201).json({ message: 'Campaign created and delivered.', campaign });
  } catch (err) {
    console.error('Campaign creation error:', err);
    res.status(500).json({ error: 'Failed to create campaign.' });
  }
};

exports.listCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 }).limit(20);
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch campaigns.' });
  }
};

exports.getCampaignDeliveryLogs = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const logs = await DeliveryLog.find({ campaign: campaignId }).populate('customer', 'name email');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch delivery logs.' });
  }
};