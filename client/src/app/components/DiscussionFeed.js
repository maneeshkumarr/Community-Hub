import React from 'react';
import styles from './DiscussionFeed.module.css';

const DiscussionFeed = ({ posts }) => {
  return (
    <div className={styles.discussionFeed}>
      <h2 className={styles.heading}>Community Discussions</h2>
      <ul className={styles.postList}>
        {posts.map((post, index) => (
          <li key={index} className={styles.postItem}>
            <div className={styles.postHeader}>
              <img src={post.avatar} alt="User Avatar" className={styles.avatar} />
              <div>
                <p className={styles.username}>{post.username}</p>
                <p className={styles.timestamp}>{post.timestamp}</p>
              </div>
            </div>
            <p className={styles.content}>{post.content}</p>
            <div className={styles.actions}>
              <button className={styles.replyButton}>Reply</button>
              <button className={styles.likeButton}>Like</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscussionFeed;