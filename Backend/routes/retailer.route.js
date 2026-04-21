const express = require('express');
const router = express.Router();

// Import the logic from the controller
const { registerRetailer, loginRetailer } = require('../controller/retailer.controller.js');

// @route   POST /api/retailers/register
router.post('/register', registerRetailer);

// @route   POST /api/retailers/login
router.post('/login', loginRetailer);

module.exports = router;