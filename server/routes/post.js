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

// Ensure the field name in multer matches the request
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const { user_id, title, content, category } = req.body;
    if (!user_id || isNaN(user_id)) {
      return res.status(400).json({ error: 'Invalid user_id. A valid user_id is required.' });
    }

    // Add logging to debug why `image_url` is null
    console.log('Request Body image_url:', req.body.image_url);
    console.log('Uploaded File:', req.file);

    const image_url = req.body.image_url || (req.file ? `/uploads/${req.file.filename}` : null);
    console.log('Final image_url:', image_url);

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

// Replace `findByIdAndUpdate` with the new `update` method
router.put('/:id', async (req, res) => {
  try {
    const { title, content, category, image_url } = req.body;
    console.log('Request to update post with ID:', req.params.id, { title, content, category, image_url });

    const result = await Post.update(req.params.id, { title, content, category, image_url });
    console.log('Update Query Result:', result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error Updating Post:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add logging to debug the `DELETE /api/posts/:id` route
router.delete('/:id', async (req, res) => {
  try {
    console.log('Request to delete post with ID:', req.params.id);
    const result = await Post.delete(req.params.id);
    console.log('Delete Query Result:', result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error Deleting Post:', error);
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




// Add this route to your post routes (likely in routes/post.js)
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
        COUNT(DISTINCT votes.id) AS upvotes,
        COUNT(DISTINCT comments.id) AS comments_count
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN votes ON votes.post_id = posts.id AND votes.value = 1
      LEFT JOIN comments ON comments.post_id = posts.id
      GROUP BY posts.id
      ORDER BY posts.created_at DESC
    `;
    
    const [rows] = await pool.execute(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});
module.exports = router;