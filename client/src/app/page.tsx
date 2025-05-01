'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './components/PostCard';
import CategoryFilter from './components/CategoryFilter';

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
  const [votes, setVotes] = useState<{ [key: number]: number }>({});
  const [commentVisible, setCommentVisible] = useState<{ [key: number]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/posts/community-hub');
        setPosts(res.data);
        const voteMap: { [key: number]: number } = {};
        res.data.forEach((post: Post) => {
          voteMap[post.id] = post.upvotes || 0;
        });
        setVotes(voteMap);
      } catch (err) {
        console.error(err);
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleVote = (id: number, change: number) => {
    setVotes((prev) => ({ ...prev, [id]: (prev[id] || 0) + change }));
  };

  const toggleComments = (id: number) => {
    setCommentVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (post: Post) => {
    const url = window.location.href;
    const text = `${post.title} - ${post.content}`;
    if (navigator.share) {
      navigator.share({ title: post.title, text, url }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const categories = ['All', 'Discussion', 'News', 'Posts', 'Query', 'Job'];

  const filteredPosts = posts.filter((post) => {
    const matchCat = activeCategory === 'All' || post.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="p-4">
      <header className="mb-4">
        <h1 className="text-xl font-bold mb-2">Community Hub</h1>
        <input
          type="text"
          placeholder="Search posts here..."
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CategoryFilter categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
      </header>

      <main>
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              votes={votes[post.id] || 0}
              onVote={handleVote}
              onToggleComments={toggleComments}
              onShare={handleShare}
              commentsVisible={commentVisible[post.id]}
            />
          ))
        )}
      </main>
    </div>
  );
}
