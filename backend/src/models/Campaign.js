const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  segmentRules: { type: Object, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  stats: {
    sent: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
    audienceSize: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Campaign', campaignSchema);