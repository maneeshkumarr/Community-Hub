'use client';
import { useState, useEffect } from 'react';
import styles from './PostCard.module.css';
import { io } from 'socket.io-client';

const PostCard = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000');
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit('joinPostRoom', post.post_id);
    socket.on('commentAdded', (data) => {
      if (data.postId === post.post_id) {
        setComments(prev => [...prev, data.comment]);
      }
    });

    return () => {
      socket.off('commentAdded');
    };
  }, [socket, post.post_id]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments/post/${post.post_id}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: post.post_id,
          user_id: 1, // Replace with actual user ID from auth
          content: newComment
        })
      });

      if (response.ok) {
        setNewComment('');
        if (socket) {
          socket.emit('newComment', {
            postId: post.post_id,
            comment: { content: newComment, username: 'CurrentUser' } // Replace with actual user data
          });
        }
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleVote = async (voteType) => {
    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: post.post_id,
          user_id: 1, // Replace with actual user ID from auth
          value: voteType === 'upvote' ? 1 : -1
        })
      });

      if (response.ok) {
        // Optimistic UI update
        // You might want to refetch the post to get accurate vote count
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <span className={styles.username}>@{post.username}</span>
        <span className={styles.category}>{post.category}</span>
      </div>
      <h3 className={styles.postTitle}>{post.title}</h3>
      <p className={styles.postContent}>{post.content}</p>
      
      {post.image_url && (
        <div className={styles.postImage}>
          <img src={post.image_url} alt="Post visual" />
        </div>
      )}

      <div className={styles.postFooter}>
        <div className={styles.voteSection}>
          <button onClick={() => handleVote('upvote')}>👍 {post.upvotes || 0}</button>
          <button onClick={() => handleVote('downvote')}>👎</button>
        </div>
        <button 
          className={styles.commentButton}
          onClick={() => {
            setShowComments(!showComments);
            if (!showComments && comments.length === 0) {
              fetchComments();
            }
          }}
        >
          💬 {comments.length} Comments
        </button>
        <button className={styles.shareButton}>Share</button>
      </div>

      {showComments && (
        <div className={styles.commentsSection}>
          <div className={styles.addComment}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Post</button>
          </div>
          <div className={styles.commentsList}>
            {comments.map((comment, index) => (
              <div key={index} className={styles.comment}>
                <strong>@{comment.username || 'anonymous'}</strong>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;