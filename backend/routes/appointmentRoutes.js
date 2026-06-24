const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// ROUTE 1: Book a free appointment (POST)
// URL: http://localhost:5000/api/appointments
router.post('/', async (req, res) => {
    try {
        const newAppointment = new Appointment({
            customerName: req.body.customerName,
            customerPhone: req.body.customerPhone,
            appointmentDate: req.body.appointmentDate,
            appointmentTime: req.body.appointmentTime,
            notes: req.body.notes
        });

        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(400).json({ message: "Error booking appointment: " + error.message });
    }
});

// ROUTE 2: Get all appointments for Mother's Dashboard (GET)
// URL: http://localhost:5000/api/appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ appointmentDate: 1, appointmentTime: 1 });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments: " + error.message });
    }
});

module.exports = router;