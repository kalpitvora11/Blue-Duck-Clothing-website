const Inquiry = require('../models/inquiry.model.js');

const createInquiry = async (req, res) => {
  try {
    const { companyName, contactName, email, volume, message } = req.body;

    if (!companyName || !contactName || !email || !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newInquiry = await Inquiry.create({
      companyName,
      contactName,
      email,
      volume,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: newInquiry
    });

  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ success: false, message: 'Server error processing inquiry' });
  }
};

const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, message: 'Server error fetching inquiries' });
  }
};

module.exports = {
  createInquiry,
  getInquiries
};