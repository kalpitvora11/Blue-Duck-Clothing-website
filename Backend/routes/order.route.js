const express = require('express');
const router = express.Router();

const { createBulkOrder, getOrders } = require('../controller/order.controller.js');

// @route   POST /api/orders
router.post('/', createBulkOrder);

// @route   GET /api/orders
router.get('/', getOrders);

module.exports = router;