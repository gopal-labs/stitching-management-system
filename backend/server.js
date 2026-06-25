const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');


// 1. Load environment variables from .env
dotenv.config();

// 2. Connect to the MongoDB database
connectDB();

// 3. Initialize the Express server instance
const app = express();

// 4. Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));          
app.use(express.json());  

// 5. Test Route (To verify everything is working)
app.get('/api/test', (req, res) => {
    res.json({ message: "Tailor shop backend is up and running!" });
});

app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/status', require('./routes/statusRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
// 6. Define the running port
const PORT = process.env.PORT || 5000;

// 🚀 CLEANED UP: The broken app.put block has been removed from here!

// 7. Start listening for incoming connections
app.listen(PORT, () => {
    console.log(`Server is running in development mode on port ${PORT}`);
});