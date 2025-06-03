const { publishToStream } = require('../pubsub/producer');

exports.ingestCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required.' });

    await publishToStream('customerStream', req.body);

    res.status(202).json({ message: 'Customer data queued for ingestion.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to enqueue customer data.' });
  }
};