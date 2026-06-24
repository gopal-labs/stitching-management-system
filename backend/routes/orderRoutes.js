const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Import the blueprint we just made

// ROUTE 1: Submit a new custom tailoring order (POST)
// URL: http://localhost:5000/api/orders
router.post('/', async (req, res) => {
    try {
        // Create a new order object using the data sent from the frontend form
        const newOrder = new Order({
            customerName: req.body.customerName,
            customerPhone: req.body.customerPhone,
            garmentCategory: req.body.garmentCategory,
            selectedDesignId: req.body.selectedDesignId,
            measurements: req.body.measurements // Object containing length, chest, waist, etc.
        });

        // Permanently save it into the MongoDB database
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: "Error saving order: " + error.message });
    }
});

// ROUTE 2: Get all orders for Mother's Dashboard (GET)
// URL: http://localhost:5000/api/orders
router.get('/', async (req, res) => {
    try {
        // Fetch all orders from MongoDB and sort them with the newest first
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders: " + error.message });
    }
});

router.put('/:id/approve', async (req, res) => {
  try {
    const orderId = req.params.id;
    
    // 💡 Note: Your file likely imports your model as 'Order' or 'OrderModel' near the top. 
    // We update 'orderStatus' to match exactly what your React code views!
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: 'Approved' }, 
      { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: '✨ Order approved successfully!', order: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while updating status' });
  }
});
// Export the router so the main server.js file can use it
module.exports = router;