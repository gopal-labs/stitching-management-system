const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: String, // e.g., "2026-07-15"
        required: true
    },
    appointmentTime: {
        type: String, // e.g., "14:30" or "02:30 PM"
        required: true
    },
    notes: {
        type: String, // e.g., "Bringing my own fabric for a Salwar Suit"
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);