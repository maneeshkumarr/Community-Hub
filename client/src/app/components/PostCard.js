import React, { useState } from 'react';
import styles from './PostCard.module.css';
import { usePostUpdates } from '../utils/socket';

const PostCard = ({ post, onVote }) => {
  const [votes, setVotes] = useState(post.votes);

  usePostUpdates(post._id, (update) => {
    if (update.type === 'vote') {
      setVotes(update.votes);
    }
    // Handle other update types (e.g., comments) if needed
  });

  const handleVote = async (voteType) => {
    try {
      const response = await fetch(`/api/posts/${post._id}/vote`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voteType }),
      });
      if (response.ok) {
        const updatedPost = await response.json();
        setVotes(updatedPost.votes);
        if (onVote) onVote(updatedPost);
      }
    } catch (error) {
      console.error('Error voting on post:', error);
    }
  };

  return (
    <div className={styles.postCard}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt={post.title} className={styles.image} />}
      <div className={styles.actions}>
        <button onClick={() => handleVote('upvote')}>Upvote</button>
        <span>{votes}</span>
        <button onClick={() => handleVote('downvote')}>Downvote</button>
      </div>
      <div className={styles.share}>Share</div>
    </div>
  );
};

export default PostCard;