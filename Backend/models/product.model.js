const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  sizes: [{ type: String }],
  moq: { type: Number, default: 20 },
  pricingTiers: [
    {
      minQuantity: { type: Number, required: true },
      pricePerUnit: { type: Number, required: true }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);