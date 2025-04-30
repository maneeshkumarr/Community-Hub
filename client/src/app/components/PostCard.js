import React, { useState } from 'react';
import styles from './PostCard.module.css';
import { usePostUpdates } from '../utils/socket';

const PostCard = ({ post, onVote }) => {
  const [votes, setVotes] = useState(post.votes);

  usePostUpdates(post._id, (update) => {
    if (update.type === 'vote') {
      setVotes(update.votes);
    }
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
      <div className={styles.postCardHeader}>
        <img src={post.user.avatar} alt={post.user.username} className={styles.avatar} />
        <span className={styles.username}>{post.user.username}</span>
      </div>
      <div className={styles.postCardBody}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt={post.title} className={styles.image} />}
      </div>
      <div className={styles.postCardFooter}>
        <div className={styles.actions}>
          <button onClick={() => handleVote('upvote')} className={styles.upvoteButton}>Upvote</button>
          <span className={styles.voteCount}>{votes}</span>
          <button onClick={() => handleVote('downvote')} className={styles.downvoteButton}>Downvote</button>
        </div>
        <div className={styles.shareButton}>Share</div>
      </div>
    </div>
  );
};

export default PostCard;