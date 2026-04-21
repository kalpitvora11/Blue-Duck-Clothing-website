const Product = require('../models/product.model.js'); 

// @desc    Get all wholesale products
// @access  Public (or Private if you only want logged-in retailers to see the catalog)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server Error while fetching catalog' });
  }
};

// @desc    Get a single product by ID
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    
    // Check if the error is because of an invalid MongoDB ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create a new product (Admin Only)
// @access  Private/Admin (You would protect this with admin middleware later)
const createProduct = async (req, res) => {
  try {
    const { name, sku, description, sizes, moq, pricingTiers, inStock } = req.body;

    // Check if SKU already exists to prevent duplicates
    const productExists = await Product.findOne({ sku });
    if (productExists) {
      return res.status(400).json({ success: false, message: 'A product with this SKU already exists' });
    }

    const product = await Product.create({
      name,
      sku,
      description,
      sizes,
      moq,
      pricingTiers,
      inStock
    });

    res.status(201).json({
      success: true,
      message: 'Product added to catalog successfully',
      data: product
    });

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Server error while creating product' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct
};