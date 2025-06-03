const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },

  // Add these
  age: { type: Number },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  city: { type: String },
  interests: [String],
});

module.exports = mongoose.model('User', userSchema);
