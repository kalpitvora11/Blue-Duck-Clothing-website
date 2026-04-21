const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Retailer = require('../models/retailer.model.js');

// @desc    Register a new retailer account (Pending Approval)
const registerRetailer = async (req, res) => {
  try {
    const { companyName, contactPerson, email, password} = req.body;

    let retailer = await Retailer.findOne({ email });
    if (retailer) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    retailer = new Retailer({
      companyName,
      contactPerson,
      email,
      password: hashedPassword
    });

    await retailer.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful. You can now login.'
    });

  } catch (error) {
    console.error('Error in retailer registration:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

// @desc    Authenticate retailer & get token
const loginRetailer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const retailer = await Retailer.findOne({ email });
    if (!retailer) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, retailer.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const payload = {
      retailer: {
        id: retailer.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_secret_for_development',
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          retailer: {
            id: retailer.id,
            companyName: retailer.companyName
          }
        });
      }
    );

  } catch (error) {
    console.error('Error in retailer login:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

module.exports = {
  registerRetailer,
  loginRetailer
};