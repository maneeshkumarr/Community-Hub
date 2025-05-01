'use client';
import React from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  email: string;
  image_url?: string;
  upvotes?: number;
  comments_count?: number;
}

interface PostCardProps {
  post: Post;
  votes: number;
  onVote: (postId: number, change: number) => void;
  onToggleComments: (postId: number) => void;
  onShare: (post: Post) => void;
  commentsVisible: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  votes,
  onVote,
  onToggleComments,
  onShare,
  commentsVisible,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-200">
      <div className="flex items-center mb-3">
        <img
          src="/profile-avatar.jpg"
          onError={(e) => ((e.target as HTMLImageElement).src = '/default-avatar.webp')}
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="text-sm font-semibold">@{post.username}</p>
          <p className="text-xs text-gray-500">{post.email}</p>
        </div>
      </div>

      <h2 className="text-md font-bold mb-2">{post.title}</h2>

      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          className="w-full h-auto rounded mb-2"
          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
        />
      )}

      <p className="text-sm text-gray-700 mb-2">{post.content}</p>

      <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
        <button onClick={() => onVote(post.id, 1)}>👍 {votes}</button>
        <button onClick={() => onToggleComments(post.id)}>💬 {post.comments_count || 0}</button>
        <button onClick={() => onShare(post)}>🔗 Share</button>
      </div>

      {commentsVisible && (
        <div className="mt-4 bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500 italic">Comments section is now visible.</p>
        </div>
      )}
    </div>
  );
};

export default PostCard;
