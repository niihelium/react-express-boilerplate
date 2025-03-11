const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // const token = req.header('Authorization')?.split(' ')[1];
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // @ts-ignore
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only admin users are allowed.' });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
