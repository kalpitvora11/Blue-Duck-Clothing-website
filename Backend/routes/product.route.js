const express = require('express');
const router = express.Router();

// Import the logic from the controller
const { 
  getProducts, 
  getProductById, 
  createProduct 
} = require('../controller/product.controller.js');

// @route   GET /api/products
// @desc    Get all products
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Get a single product by ID
router.get('/:id', getProductById);

// @route   POST /api/products
// @desc    Create a new product
router.post('/', createProduct);

module.exports = router;