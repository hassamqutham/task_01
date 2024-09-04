// /routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const router = express.Router();

// Create a new user 
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  User.create(username, hashedPassword, (err, results) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    res.send('User created successfully!');
  });
});

// Get all users 
router.get('/', (req, res) => {
  User.findAll((err, users) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    res.json(users);
  });
});

// Update 
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  User.updatePassword(id, hashedPassword, (err, results) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    res.send('User updated successfully!');
  });
});

// Delete
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  User.deleteById(id, (err, results) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    res.send('User deleted successfully!');
  });
});

module.exports = router;
