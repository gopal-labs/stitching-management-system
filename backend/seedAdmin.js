const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/boutique')
  .then(async () => {
    // Check if an admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit();
    }

    // Hash the secure password before saving it
    const hashedPassword = await bcrypt.hash('gopal29', 10); // 💡 Change password here
    
    await Admin.create({
      username: 'admin',
      password: hashedPassword
    });

    console.log('✨ Admin user seeded successfully!');
    process.exit();
  })
  .catch(err => console.error(err));