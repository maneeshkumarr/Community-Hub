const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password_hash } = req.body;
    if (!username || !email || !password_hash) {
      return res.status(400).json({ error: 'All fields are required: username, email, password_hash' });
    }

    const result = await User.create({ username, email, password_hash });
    res.status(201).json({ id: result.insertId, username, email });
  } catch (error) {
    console.error('Error Creating User:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error Fetching Users:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error Fetching User:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const { username, email, password_hash } = req.body;
    if (!username || !email || !password_hash) {
      return res.status(400).json({ error: 'All fields are required: username, email, password_hash' });
    }

    const result = await User.update(req.params.id, { username, email, password_hash });
    res.status(200).json({ message: 'User updated successfully', result });
  } catch (error) {
    console.error('Error Updating User:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await User.delete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully', result });
  } catch (error) {
    console.error('Error Deleting User:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;