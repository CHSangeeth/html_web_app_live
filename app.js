require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const statsRoutes = require('./routes/stats');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use environment variable for session secret
app.use(session({
  secret: process.env.SESSION_SECRET || 'forex_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Make user available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user;
  next();
});

// Page routes
app.get('/', (req, res) => {
  if (req.session.user) {
    if (req.session.user.isAdmin) return res.redirect('/admin');
    return res.redirect('/dashboard');
  }
  res.render('index', { error: null });
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  if (req.session.user.isAdmin) return res.redirect('/admin');
  res.render('dashboard');
});

app.get('/admin', (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) return res.redirect('/');
  res.render('admin');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/auth', statsRoutes);

// 404
app.use((req, res) => res.status(404).send('404 Not Found'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));