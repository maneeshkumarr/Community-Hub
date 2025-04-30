'use client';
import React, { useState, useEffect } from 'react';
import PostCard from './components/PostCard';
import CreatePostModal from './components/CreatePostModal';
import styles from './page.module.css';

// Add TypeScript types for posts and newPost
interface Post {
  _id: string;
  title: string;
  content: string;
  // Add other fields as necessary
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
      <button onClick={() => setIsModalOpen(true)}>Create Post</button>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onVote={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default Page;
