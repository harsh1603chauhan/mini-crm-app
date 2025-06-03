const { publishToStream } = require('../pubsub/producer');

exports.ingestOrder = async (req, res) => {
  try {
    const { customerId, amount, items } = req.body;
    if (!customerId || !amount || !items) return res.status(400).json({ error: 'customerId, amount, and items are required.' });

    await publishToStream('orderStream', req.body);

    res.status(202).json({ message: 'Order data queued for ingestion.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to enqueue order data.' });
  }
};