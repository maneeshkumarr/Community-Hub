'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './components/PostCard';
import CategoryFilter from './components/CategoryFilter';
import { FiSearch } from 'react-icons/fi';

type Post = {
  id: number;
  title: string;
  content: string;
  username: string;
  email: string;
  image_url?: string;
  upvotes?: number;
  comments_count?: number;
  category?: string;
};

type Comment = {
  id: number;
  post_id: number;
  user_id: number;
  username?: string;
  content: string;
  created_at: string;
};

export default function CommunityHub() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [votes, setVotes] = useState<{ [key: number]: number }>({});
  const [commentVisible, setCommentVisible] = useState<{ [key: number]: boolean }>({});
  const [commentsByPostId, setCommentsByPostId] = useState<{ [key: number]: Comment[] }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    username: '',
    email: '',
    category: '',
    image: null as File | null,
  });

  const categories = ['All', 'Discussion', 'News', 'Posts', 'Query', 'Job'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/posts');
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

    const fetchComments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/comments');
        const grouped: { [key: number]: Comment[] } = {};
        res.data.forEach((comment: Comment) => {
          if (!grouped[comment.post_id]) grouped[comment.post_id] = [];
          grouped[comment.post_id].push(comment);
        });
        setCommentsByPostId(grouped);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      }
    };

    fetchPosts();
    fetchComments();
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

  const handleDelete = async (postId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      alert('Post deleted.');
    } catch (err) {
      console.error(err);
      alert('Failed to delete post.');
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newPost.title);
    formData.append('content', newPost.content);
    formData.append('username', newPost.username);
    formData.append('email', newPost.email);
    formData.append('category', newPost.category);
    if (newPost.image) formData.append('image', newPost.image);

    try {
      const res = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const createdPost = res.data;
      setPosts((prev) => [createdPost, ...prev]);
      setVotes((prev) => ({ ...prev, [createdPost.id]: createdPost.upvotes || 0 }));
      setShowForm(false);
      setNewPost({ title: '', content: '', username: '', email: '', category: '', image: null });
    } catch (err) {
      console.error('Error submitting post:', err);
      alert('Failed to submit post.');
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchCat = activeCategory === 'All' || post.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="p-4 pt-16">
      <header className="mb-4 bg-green-100 p-4 rounded">
        <h1 className="text-xl font-bold mb-3">Community Hub</h1>
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-2.5 text-green-800" />
          <input
            type="text"
            placeholder="Search posts here..."
            className="w-full pl-10 pr-3 py-2 rounded border border-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </header>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        {showForm ? 'Close Form' : 'Post Something'}
      </button>

      {showForm && (
        <form
          onSubmit={handlePostSubmit}
          className="bg-white shadow p-4 rounded mb-6 border space-y-3"
          encType="multipart/form-data"
        >
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Your Name"
            value={newPost.username}
            onChange={(e) => setNewPost({ ...newPost, username: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={newPost.email}
            onChange={(e) => setNewPost({ ...newPost, email: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <select
            required
            value={newPost.category}
            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.slice(1).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewPost({ ...newPost, image: e.target.files?.[0] || null })}
            className="w-full"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
            Submit Post
          </button>
        </form>
      )}

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
              onDelete={handleDelete}
              commentsVisible={commentVisible[post.id]}
              comments={commentsByPostId[post.id] || []} // ✅ Added here
            />
          ))
        )}
      </main>
    </div>
  );
}
