import { useState } from 'react';
import { Card, Avatar, Button, Space, Typography, Image, message } from 'antd';
import { 
  LikeOutlined, 
  LikeFilled, 
  DislikeOutlined, 
  DislikeFilled,
  MessageOutlined,
  ShareAltOutlined 
} from '@ant-design/icons';
import axios from 'axios';
import { useSocket } from '../utils/socket';

const { Text, Paragraph } = Typography;

export default function PostCard({ post, currentUser }) {
  const [voteStatus, setVoteStatus] = useState(null);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const socket = useSocket();

  const handleVote = async (value) => {
    try {
      const newValue = voteStatus === value ? 0 : value;
      await axios.patch(`/api/posts/${post.id}/vote`, { value: newValue });
      
      if (newValue === 1) {
        setUpvotes(prev => voteStatus === 1 ? prev - 1 : prev + 1);
        setDownvotes(prev => voteStatus === -1 ? prev - 1 : prev);
      } else if (newValue === -1) {
        setDownvotes(prev => voteStatus === -1 ? prev - 1 : prev + 1);
        setUpvotes(prev => voteStatus === 1 ? prev - 1 : prev);
      } else {
        if (voteStatus === 1) setUpvotes(prev => prev - 1);
        if (voteStatus === -1) setDownvotes(prev => prev - 1);
      }
      
      setVoteStatus(newValue === 0 ? null : newValue);
      socket.emit('voteUpdate', { postId: post.id });
    } catch (error) {
      message.error('Failed to process vote');
    }
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <Avatar src={post.userAvatar}>{post.username.charAt(0)}</Avatar>
        <div style={{ marginLeft: 12 }}>
          <Text strong>{post.username}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {new Date(post.created_at).toLocaleString()}
          </Text>
        </div>
      </div>
      
      {post.title && <Title level={5}>{post.title}</Title>}
      <Paragraph>{post.content}</Paragraph>
      
      {post.image_url && (
        <Image
          src={post.image_url}
          alt="Post image"
          style={{ maxHeight: 400, objectFit: 'contain' }}
        />
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <Space>
          <Button 
            type="text" 
            icon={voteStatus === 1 ? <LikeFilled /> : <LikeOutlined />}
            onClick={() => handleVote(1)}
          >
            {upvotes}
          </Button>
          <Button 
            type="text" 
            icon={voteStatus === -1 ? <DislikeFilled /> : <DislikeOutlined />}
            onClick={() => handleVote(-1)}
          >
            {downvotes}
          </Button>
        </Space>
        
        <Space>
          <Button type="text" icon={<MessageOutlined />}>
            {post.comment_count}
          </Button>
          <Button type="text" icon={<ShareAltOutlined />}>
            Share
          </Button>
        </Space>
      </div>
    </Card>
  );
}