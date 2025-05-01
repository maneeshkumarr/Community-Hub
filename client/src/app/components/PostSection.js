import React from 'react';
import styles from './PostSection.module.css';

const PostSection = ({ post }) => {
  return (
    <div className={styles.postSection}>
      <div className={styles.userInfo}>
        <img src={post.avatar} alt="User Avatar" className={styles.avatar} />
        <div>
          <p className={styles.username}>{post.username}</p>
          <p className={styles.handle}>@{post.handle}</p>
        </div>
        <button className={styles.optionsButton}>⋮</button>
      </div>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <div className={styles.imageGrid}>
        {post.images.map((image, index) => (
          <img key={index} src={image} alt={`Post Image ${index + 1}`} className={styles.postImage} />
        ))}
      </div>
      <p className={styles.postDescription}>{post.description}</p>
      <div className={styles.actionBar}>
        <button className={styles.actionButton}>👍 {post.upvotes}</button>
        <button className={styles.actionButton}>👎 {post.downvotes}</button>
        <button className={styles.actionButton}>💬 {post.comments} Comments</button>
        <button className={styles.actionButton}>🔗 Share</button>
      </div>
    </div>
  );
};

export default PostSection;