const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  volume: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['New', 'Reviewed', 'Replied'],
    default: 'New'
  }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
