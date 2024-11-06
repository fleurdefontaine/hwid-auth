const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const { ensureAuthenticated } = require('../config/authConfig');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/hwid/dashboard',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.redirect('/auth/login');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    res.redirect('/');
  });
});

module.exports = router;