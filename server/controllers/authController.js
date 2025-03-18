const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    // Validate input
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Missing email, username or password' });
    }

    // prevent duplicate username
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    try {
        const newUserId = await User.create(username, email, hashedPassword);
        res.status(200).json({ message: 'User registered successfully', id: newUserId });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Error creating user' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: 'Missing username/email or password' });
    }

    // Find user
    let user;
    if (username.includes('@')) {
        user = await User.findByEmail(email);
    } else {
        user = await User.findByUsername(username);
    }
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    
    res.json({ token });
  };

module.exports = { registerUser, loginUser }