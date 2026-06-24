const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/boutique')
  .then(async () => {
    console.log(' Connected to database. Resetting admin account...');
    
    // 1. Delete any existing admin records entirely to avoid duplicates
    await Admin.deleteMany({ username: 'admin' });

    // 2. Hash your password cleanly
    const plaintextPassword = 'gopal29'; // 💡 This is your EXACT password
    const hashedPassword = await bcrypt.hash(plaintextPassword, 10);
    
    // 3. Create the clean account entry
    await Admin.create({
      username: 'admin',
      password: hashedPassword
    });

    console.log('\n==================================================');
    console.log('✨ ADMIN ACCOUNT RESET SUCCESSFUL!');
    console.log(`👤 Username: admin`);
    console.log(`🔑 Password: ${plaintextPassword}`);
    console.log('==================================================\n');
    
    process.exit();
  })
  .catch(err => {
    console.error('❌ Reset failed:', err);
    process.exit(1);
  });