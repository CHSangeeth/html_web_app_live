const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);
  if (!user) return res.json({ success: false, error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, error: 'Invalid credentials' });
  req.session.user = { id: user.id, username: user.username, isAdmin: !!user.isAdmin };
  res.json({ success: true, isAdmin: !!user.isAdmin });
};

exports.register = async (req, res) => {
  const { username, whatsapp, password } = req.body;
  if (!username || !whatsapp || !password) return res.json({ success: false, error: 'All fields required' });
  const exists = await User.findByUsername(username);
  if (exists) return res.json({ success: false, error: 'Username already exists' });
  const hash = await bcrypt.hash(password, 10);
  await User.createUser({ username, whatsapp, password: hash, isAdmin: false });
  res.json({ success: true });
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};