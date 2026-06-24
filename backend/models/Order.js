const mongoose = require('mongoose');

// Define the blueprint for a tailor order
const OrderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    garmentCategory: {
        type: String, 
        required: true, // e.g., "Blouse", "Salwar Suit"
    },
    selectedDesignId: {
        type: String,   // Reference to the design they picked from the gallery
        required: true
    },
    // We isolate measurements inside their own object field
    measurements: {
        length: { type: Number },
        chest: { type: Number },
        waist: { type: Number },
        shoulder: { type: Number },
        hips: { type: Number }
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Stitching', 'Ready for Delivery', 'Delivered'],
        default: 'Pending' // New orders automatically start as Pending
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the blueprint so our routes can use it to create orders
module.exports = mongoose.model('Order', OrderSchema);