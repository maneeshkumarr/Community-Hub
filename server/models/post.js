const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  votes: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['Discussion', 'News', 'Posts', 'Query', 'Job'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema);