const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Post = require('../models/post');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer config
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// POST: Create post with images
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content, category, username, email } = req.body;
    const user_id = 1; // Dummy value until user system is in place

    if (!title?.trim()) return res.status(400).json({ error: 'Title required' });
    if (!content?.trim()) return res.status(400).json({ error: 'Content required' });

    const validCategories = ['discussion', 'news', 'post', 'query', 'job'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: `Invalid category. Valid: ${validCategories.join(', ')}` });
    }

    const result = await Post.create({ user_id, title, content, category, username, email });
    const postId = result.insertId;

    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    if (image_url) await Post.addImages(postId, [image_url]);

    res.status(201).json({ id: postId, title, content, category, username, email, image_url: image_url });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// GET all posts
router.get('/', async (_, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// PUT update post
router.put('/:id', async (req, res) => {
  try {
    const { title, content, category } = req.body;
    await Post.update(req.params.id, { title, content, category });
    res.status(200).json({ message: 'Post updated' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// DELETE post
router.delete('/:id', async (req, res) => {
  try {
    await Post.delete(req.params.id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;
