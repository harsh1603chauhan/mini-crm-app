const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  orderDate: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  items: [{ 
    productId: String, 
    name: String, 
    price: Number, 
    quantity: Number 
  }]
});

module.exports = mongoose.model('Order', orderSchema);