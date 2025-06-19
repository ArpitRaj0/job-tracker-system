const User = require('../models/user');

const isAdmin = async (req, res, next) => {
  try {
    console.log("🛡️ Checking admin: req.user =", req.user);
    const user = await User.findById(req.user);
    if (user && user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  } catch (err) {
    console.error("❌ isAdmin middleware error:", err);
  res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = isAdmin;
