const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Secret key for JWT signing (Should ideally go into your .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'SUPER_SECRET_TOKEN_KEY_123';

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Find user
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid Username or Password' });
    }

    // 2. Compare hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Username or Password' });
    }

    // 3. Issue JWT Token (Valid for 2 hours)
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '2h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server authentication failure' });
  }
});

module.exports = router;