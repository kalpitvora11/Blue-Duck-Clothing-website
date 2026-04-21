const express = require('express');
const router = express.Router();

const { createInquiry, getInquiries } = require('../controller/inquiry.controller.js');

router.post('/', createInquiry);
router.get('/', getInquiries);

module.exports = router;