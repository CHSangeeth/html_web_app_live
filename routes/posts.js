const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Middleware: require login
function requireLogin(req, res, next) {
  if (req.session.user) return next();
  res.status(401).json({ success: false, error: 'Unauthorized' });
}

// Middleware: require admin
function requireAdmin(req, res, next) {
  if (req.session.user && req.session.user.isAdmin) return next();
  res.status(403).json({ success: false, error: 'Forbidden' });
}

// Public posts for dashboard
router.get('/public', requireLogin, postController.listPublic);

// Admin CRUD
router.get('/', requireAdmin, postController.listAll);
router.post('/', requireAdmin, postController.create);
router.put('/:id', requireAdmin, postController.update);
router.delete('/:id', requireAdmin, postController.delete);

module.exports = router;