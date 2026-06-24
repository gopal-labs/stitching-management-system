const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Attempt to connect to the database using the URL in our .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        process.exit(1); // Stop the server completely if the database fails
    }
};

module.exports = connectDB;