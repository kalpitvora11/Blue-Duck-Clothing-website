const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unitPriceApplied: {
    type: Number,
    required: true
  },
  lineTotal: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  retailer: {
    type: String,
    default: 'Guest Retailer'
  },
  items: [orderItemSchema],
  grandTotal: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  orderNotes: {
    type: String,
    description: 'Any special instructions from the retailer for this bulk order'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);