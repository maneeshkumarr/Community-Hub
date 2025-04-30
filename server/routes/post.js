const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const authenticate = require('../middlewares/auth');

// Get all posts with vote counts and comment counts
router.get('/', async (req, res) => {
  try {
    const [posts] = await pool.query(`
      SELECT p.*, u.username,
        COALESCE(SUM(v.value = 1), 0) AS upvotes,
        COALESCE(SUM(v.value = -1), 0) AS downvotes,
        COUNT(c.id) AS comment_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN votes v ON p.id = v.post_id
      LEFT JOIN comments c ON p.id = c.post_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Create a new post
router.post('/', authenticate, async (req, res) => {
  const { title, content, category, image_url } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO posts (user_id, title, content, category, image_url) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, title, content, category, image_url]
    );
    
    const [newPost] = await pool.query(`
      SELECT p.*, u.username, 0 AS upvotes, 0 AS downvotes, 0 AS comment_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `, [result.insertId]);
    
    res.status(201).json(newPost[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Vote on a post
router.patch('/:id/vote', authenticate, async (req, res) => {
  const { value } = req.body;
  const postId = req.params.id;
  
  try {
    // Check if user already voted
    const [existingVote] = await pool.query(
      'SELECT * FROM votes WHERE post_id = ? AND user_id = ?',
      [postId, req.user.id]
    );
    
    if (existingVote.length > 0) {
      await pool.query(
        'UPDATE votes SET value = ? WHERE post_id = ? AND user_id = ?',
        [value, postId, req.user.id]
      );
    } else {
      await pool.query(
        'INSERT INTO votes (post_id, user_id, value) VALUES (?, ?, ?)',
        [postId, req.user.id, value]
      );
    }
    
    // Get updated vote counts
    const [[upvotes]] = await pool.query(
      'SELECT COUNT(*) AS count FROM votes WHERE post_id = ? AND value = 1',
      [postId]
    );
    
    const [[downvotes]] = await pool.query(
      'SELECT COUNT(*) AS count FROM votes WHERE post_id = ? AND value = -1',
      [postId]
    );
    
    res.json({ upvotes: upvotes.count, downvotes: downvotes.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing vote' });
  }
});

module.exports = router;