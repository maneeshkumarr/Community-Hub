import React, { useState } from 'react';
import { Card, Avatar, Button, Space } from 'antd';
import { LikeOutlined, DislikeOutlined, ShareAltOutlined } from '@ant-design/icons';
import styles from './PostCard.module.css';
import { usePostUpdates } from '../utils/socket';

const { Meta } = Card;

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
    <Card
      className={styles.postCard}
      cover={post.image && <img alt={post.title} src={post.image} className={styles.image} />}
      actions={[
        <Button type="text" icon={<LikeOutlined />} onClick={() => handleVote('upvote')}>Upvote</Button>,
        <span>{votes}</span>,
        <Button type="text" icon={<DislikeOutlined />} onClick={() => handleVote('downvote')}>Downvote</Button>,
        <Button type="text" icon={<ShareAltOutlined />}>Share</Button>,
      ]}
    >
      <Meta
        avatar={<Avatar src={post.user.avatar} />}
        title={post.user.username}
        description={post.title}
      />
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className={styles.image}
        />
      )}
      <p>{post.content}</p>
    </Card>
  );
};

export default PostCard;