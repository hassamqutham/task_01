const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const router = express.Router();

// Route to display the login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Route to handle login form submission
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, async (err, user) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return res.send('Login successful!');
      }
    }
    res.send('Invalid username or password.');
  });
});

module.exports = router;
