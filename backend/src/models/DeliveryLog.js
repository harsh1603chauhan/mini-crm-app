const mongoose = require('mongoose');

const deliveryLogSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  message: { type: String, required: true },
  deliveryStatus: { type: String, enum: ['SENT', 'FAILED', 'PENDING'], default: 'PENDING' },
  deliveryTimestamp: { type: Date },
  vendorResponse: { type: Object }
});

module.exports = mongoose.model('DeliveryLog', deliveryLogSchema);