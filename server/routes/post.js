const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');
const path = require('path');
const pool = require('../config/db');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Create a new post
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { user_id, title, content, category } = req.body;
    
    // Validation
    if (!user_id || isNaN(user_id)) {
      return res.status(400).json({ error: 'Invalid user_id' });
    }
    if (!title?.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (!content?.trim()) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    const validCategories = ['discussion', 'news', 'post', 'query', 'job'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ 
        error: `Invalid category. Valid values: ${validCategories.join(', ')}` 
      });
    }

    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const result = await Post.create({ user_id, title, content, category, image_url });
    
    res.status(201).json({ 
      id: result.insertId, 
      user_id, 
      title, 
      content, 
      category, 
      image_url 
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get community hub posts with aggregated data
router.get('/community-hub', async (req, res) => {
  try {
    const query = `
      SELECT 
        posts.id,
        posts.title,
        posts.content,
        posts.image_url,
        posts.category,
        users.username,
        users.email,
        COUNT(DISTINCT CASE WHEN votes.value = 1 THEN votes.id END) AS upvotes,
        COUNT(DISTINCT comments.id) AS comments_count,
        posts.created_at
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN votes ON votes.post_id = posts.id
      LEFT JOIN comments ON comments.post_id = posts.id
      GROUP BY posts.id
      ORDER BY posts.created_at DESC
    `;
    
    const [posts] = await pool.execute(query);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching community hub posts:', error);
    res.status(500).json({ error: 'Failed to fetch community posts' });
  }
});

// Get single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  try {
    const { title, content, category, image_url } = req.body;
    const result = await Post.update(req.params.id, { title, content, category, image_url });
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const result = await Post.delete(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Vote on a post
router.patch('/:id/vote', async (req, res) => {
  try {
    const { voteType } = req.body;
    if (!['upvote', 'downvote'].includes(voteType)) {
      return res.status(400).json({ error: 'Invalid vote type' });
    }

    const value = voteType === 'upvote' ? 1 : -1;
    // First check if user already voted
    const [existingVote] = await pool.execute(
      'SELECT * FROM votes WHERE post_id = ? AND user_id = ?',
      [req.params.id, req.body.user_id]
    );

    if (existingVote.length > 0) {
      // Update existing vote
      await pool.execute(
        'UPDATE votes SET value = ? WHERE id = ?',
        [value, existingVote[0].id]
      );
    } else {
      // Create new vote
      await pool.execute(
        'INSERT INTO votes (post_id, user_id, value) VALUES (?, ?, ?)',
        [req.params.id, req.body.user_id, value]
      );
    }

    // Get updated vote count
    const [votes] = await pool.execute(
      'SELECT SUM(value) AS total FROM votes WHERE post_id = ?',
      [req.params.id]
    );

    res.status(200).json({ totalVotes: votes[0].total || 0 });
  } catch (error) {
    console.error('Error voting:', error);
    res.status(500).json({ error: 'Failed to process vote' });
  }
});

module.exports = router;