const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post'); // Import the Post model

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const { post_id, user_id, content } = req.body;
    if (!post_id || !user_id || !content) {
      return res.status(400).json({ error: 'All fields are required: post_id, user_id, content' });
    }

    // Check if the post_id exists in the posts table
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(400).json({ error: 'Invalid post_id. The referenced post does not exist.' });
    }

    const result = await Comment.create({ post_id, user_id, content });
    res.status(201).json({ id: result.insertId, post_id, user_id, content });
  } catch (error) {
    console.error('Error Creating Comment:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all comments for a post
router.get('/post/:post_id', async (req, res) => {
  try {
    const comments = await Comment.findAllByPostId(req.params.post_id);
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error Fetching Comments:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add a route to get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll(); // Fetch all comments from the database
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error Fetching Comments:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a comment by ID
router.put('/:id', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const result = await Comment.update(req.params.id, { content });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error('Error Updating Comment:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a comment by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Comment.delete(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error Deleting Comment:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;