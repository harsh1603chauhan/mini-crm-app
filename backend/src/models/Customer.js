const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date },
  totalSpend: { type: Number, default: 0 },
  visits: { type: Number, default: 0 },
  tags: [{ type: String }] // For AI/auto-tagging
});

module.exports = mongoose.model('Customer', customerSchema);