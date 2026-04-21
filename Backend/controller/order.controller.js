const Order = require('../models/order.model.js'); 

const createBulkOrder = async (req, res) => {
  try {
    const { items, grandTotal, retailerName } = req.body; 

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in bulk order' });
    }

    const processedItems = items.map(item => ({
      productId: String(item.id),
      name: item.name,
      quantity: item.quantity,
      unitPriceApplied: item.price,
      lineTotal: item.price * item.quantity
    }));

    // Save to Database
    const newOrder = await Order.create({ 
      retailer: retailerName || 'Guest Retailer', 
      items: processedItems, 
      grandTotal 
    });

    res.status(201).json({
      success: true,
      message: 'Bulk order processed successfully',
      data: newOrder
    });

  } catch (error) {
    console.error('Error processing bulk order:', error);
    res.status(500).json({ success: false, message: 'Server error during checkout' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Server Error while fetching orders' });
  }
};

module.exports = {
  createBulkOrder,
  getOrders
};