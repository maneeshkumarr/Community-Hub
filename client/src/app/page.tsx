'use client';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col } from 'antd';
import PostCard from './components/PostCard';
import CreatePostModal from './components/CreatePostModal';
import styles from './page.module.css';

// Add TypeScript types for posts and newPost
interface Post {
  _id: string;
  title: string;
  content: string;
  user: {
    avatar: string;
    username: string;
  };
  image?: string;
  votes: number;
}

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data: Post[] = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostCreated = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className={styles.container}>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create Post
        </Button>
      </Row>
      <Modal
        title="Create a New Post"
        open={isModalOpen} // Updated from `visible` to `open`
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onPostCreated={handlePostCreated}
        />
      </Modal>
      <Row gutter={[16, 16]}>
        {posts.map((post) => (
          <Col key={post._id} xs={24} sm={12} md={8} lg={6}>
            <PostCard post={post} onVote={() => {}} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Page;
