'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CommunityHub.module.css';

interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  email: string;
  image_url?: string;
  upvotes?: number;
  comments_count?: number;
  category?: string;
}

export default function CommunityHub() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:5000/api/posts/community-hub');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Discussion', 'News', 'Posts', 'Query', 'Job'];

  return (
    <div className={styles.communityHub}>
      <header className={styles.header}>
        <h1>Community Hub</h1>
        <input 
          type="text" 
          placeholder="Search posts here..." 
          className={styles.searchBar}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className={styles.categories}>
          {categories.map(category => (
            <button 
              key={category}
              className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <main className={styles.postsContainer}>
        {loading ? (
          <div className={styles.loading}>Loading posts...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : filteredPosts.length === 0 ? (
          <div className={styles.noPosts}>No posts found</div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <div className={styles.userInfo}>
                <img 
                  src="/profile-avatar.jpg" 
                  alt="User Avatar" 
                  className={styles.avatar}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-avatar.webp';
                  }}
                />
                <div>
                  <p className={styles.username}>@{post.username}</p>
                  <p className={styles.email}>{post.email}</p>
                </div>
              </div>
              <h2 className={styles.postTitle}>{post.title}</h2>
              {post.image_url && (
                <img 
                  src={post.image_url} 
                  alt="Post" 
                  className={styles.postImage}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <p className={styles.postContent}>{post.content}</p>
              <div className={styles.actionBar}>
                <button className={styles.actionButton}>
                  👍 {post.upvotes || 0}
                </button>
                <button className={styles.actionButton}>
                  💬 {post.comments_count || 0} Comments
                </button>
                <button className={styles.actionButton}>
                  🔗 Share
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}