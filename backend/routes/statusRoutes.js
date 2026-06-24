const express = require('express');
const router = express.Router();

// We will keep the status in the server's memory for now to keep it lightweight!
let shopStatus = {
    isAcceptingOrders: true,
    message: "Welcome! We are currently accepting new stitching orders."
};

// ROUTE 1: Get the current shop status (GET)
// URL: http://localhost:5000/api/status
router.get('/', (req, res) => {
    res.status(200).json(shopStatus);
});

// ROUTE 2: Update the shop status from Mother's Dashboard (POST)
// URL: http://localhost:5000/api/status
router.post('/', (req, res) => {
    const { isAcceptingOrders, customMessage } = req.body;
    
    if (typeof isAcceptingOrders === 'boolean') {
        shopStatus.isAcceptingOrders = isAcceptingOrders;
        shopStatus.message = customMessage || (isAcceptingOrders 
            ? "Welcome! We are currently accepting new stitching orders." 
            : "We are currently fully booked! You can still book a physical appointment slot below.");
        
        return res.status(200).json({ message: "Status updated successfully", currentStatus: shopStatus });
    }
    
    res.status(400).json({ message: "Invalid status state provided." });
});

module.exports = router;