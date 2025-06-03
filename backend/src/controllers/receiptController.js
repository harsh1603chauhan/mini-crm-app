const { publishToStream } = require('../pubsub/producer');

exports.receiveReceipt = async (req, res) => {
  try {
    const { logId, status, vendorResponse } = req.body;
    if (!logId || !status) return res.status(400).json({ error: 'logId and status are required.' });

    await publishToStream('receiptStream', req.body);

    res.status(202).json({ message: 'Receipt queued for update.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to enqueue receipt.' });
  }
};