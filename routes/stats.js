const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Middleware: require admin
function requireAdmin(req, res, next) {
  if (req.session.user && req.session.user.isAdmin) return next();
  res.status(403).json({ success: false, error: 'Forbidden' });
}

router.get('/stats', requireAdmin, statsController.getStats);

module.exports = router;