const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');
const path = require('path');

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

// Add logging to debug the `POST /api/posts` endpoint
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    // Include `user_id` in the request body
    const { user_id, title, content, category } = req.body;
    if (!user_id || isNaN(user_id)) {
      return res.status(400).json({ error: 'Invalid user_id. A valid user_id is required.' });
    }

    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    console.log('Processed Data:', { user_id, title, content, category, image_url });

    // Validate all fields in the request body
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Invalid title. Title must be a non-empty string.' });
    }

    if (!content || typeof content !== 'string' || content.trim() === '') {
      return res.status(400).json({ error: 'Invalid content. Content must be a non-empty string.' });
    }

    const validCategories = ['discussion', 'news', 'post', 'query', 'job'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: `Invalid category. Allowed values are: ${validCategories.join(', ')}` });
    }

    if (image_url && typeof image_url !== 'string') {
      return res.status(400).json({ error: 'Invalid image URL. It must be a string.' });
    }

    const result = await Post.create({ user_id, title, content, category, image_url });
    console.log('Database Insert Result:', result);

    res.status(201).json({ id: result.insertId, user_id, title, content, category, image_url });
  } catch (error) {
    console.error('Error Creating Post:', error);
    res.status(400).json({ error: error.message });
  }
});

// Updated the `GET /api/posts` endpoint to use MySQL-based `Post.findAll`
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error Fetching Posts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a post by ID
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vote on a post
router.patch('/:id/vote', async (req, res) => {
  try {
    const { voteType } = req.body;
    if (!['upvote', 'downvote'].includes(voteType)) {
      return res.status(400).json({ error: 'Invalid vote type' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.votes += voteType === 'upvote' ? 1 : -1;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;