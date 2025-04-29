const User = require('../models/userModel');

exports.getStats = async (req, res) => {
  const count = await User.countUsers();
  res.json({ success: true, totalUsers: count.count });
};