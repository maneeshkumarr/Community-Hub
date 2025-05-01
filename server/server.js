const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/posts', require('./routes/post'));
app.use('/api/users', require('./routes/user'));
app.use('/api/comments', require('./routes/comment'));
app.use('/api/votes', require('./routes/vote'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Socket.io
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('joinPostRoom', (postId) => {
    socket.join(`post_${postId}`);
    console.log(`User joined post room: post_${postId}`);
  });

  socket.on('newComment', (data) => {
    io.to(`post_${data.postId}`).emit('commentAdded', data);
    console.log(`New comment on post ${data.postId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io };