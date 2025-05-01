const express = require('express');
const router = express.Router();
const Vote = require('../models/vote');

// Create a new vote
router.post('/', async (req, res) => {
  try {
    const { post_id, user_id, value } = req.body;
    if (!post_id || !user_id || (value !== 1 && value !== -1)) {
      return res.status(400).json({ error: 'All fields are required: post_id, user_id, value (1 for upvote, -1 for downvote)' });
    }

    const result = await Vote.create({ post_id, user_id, value });
    res.status(201).json({ id: result.insertId, post_id, user_id, value });
  } catch (error) {
    console.error('Error Creating Vote:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all votes for a post
router.get('/post/:post_id', async (req, res) => {
  try {
    const votes = await Vote.findAllByPostId(req.params.post_id);
    res.status(200).json(votes);
  } catch (error) {
    console.error('Error Fetching Votes:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a vote by ID
router.put('/:id', async (req, res) => {
  try {
    const { value } = req.body;
    if (value !== 1 && value !== -1) {
      return res.status(400).json({ error: 'Value must be 1 (upvote) or -1 (downvote)' });
    }

    const result = await Vote.update(req.params.id, { value });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Vote not found' });
    }
    res.status(200).json({ message: 'Vote updated successfully' });
  } catch (error) {
    console.error('Error Updating Vote:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a vote by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Vote.delete(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Vote not found' });
    }
    res.status(200).json({ message: 'Vote deleted successfully' });
  } catch (error) {
    console.error('Error Deleting Vote:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;