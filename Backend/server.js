const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import your route files
const productRoutes = require('./routes/product.route.js');
const orderRoutes = require('./routes/order.route.js');
const retailerRoutes = require('./routes/retailer.route.js');
const inquiryRoutes = require('./routes/inquiry.route.js');

// Mount the routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/retailers', retailerRoutes);
app.use('/api/inquiries', inquiryRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    
    // Start Server only after DB connection is established
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`BlueDuck API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    // Optional: Exit the process if the DB connection fails
    process.exit(1); 
  });