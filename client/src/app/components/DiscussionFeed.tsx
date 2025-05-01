'use client';
import React from 'react';

interface Post {
  avatar: string;
  username: string;
  timestamp: string;
  content: string;
}

interface DiscussionFeedProps {
  posts: Post[];
}

const DiscussionFeed: React.FC<DiscussionFeedProps> = ({ posts }) => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Community Discussions</h2>
      <ul className="space-y-4">
        {posts.map((post, index) => (
          <li
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={post.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{post.username}</p>
                <p className="text-sm text-gray-500">{post.timestamp}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-3">{post.content}</p>
            <div className="flex gap-4">
              <button className="text-blue-600 hover:underline font-medium">Reply</button>
              <button className="text-red-600 hover:underline font-medium">Like</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscussionFeed;
