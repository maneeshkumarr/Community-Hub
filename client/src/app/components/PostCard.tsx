'use client';
import React, { useState } from 'react';
import {
  FiMoreVertical,
  FiShare,
  FiLink,
  FiFlag,
  FiBookmark,
  FiInfo,
  FiTrash2,
  FiThumbsUp,
  FiMessageSquare,
} from 'react-icons/fi';
import { MdGavel } from 'react-icons/md';

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

interface PostCardProps {
  post: Post;
  votes: number;
  onVote: (id: number, change: number) => void;
  onToggleComments: (id: number) => void;
  onShare: (post: Post) => void;
  onDelete: (id: number) => void;
  commentsVisible?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  votes,
  onVote,
  onToggleComments,
  onShare,
  onDelete,
  commentsVisible,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      onDelete(post.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden mb-4">
      {/* Header */}
      <div className="bg-[#033C4A] px-4 py-2 flex justify-between items-center text-white">
        <div className="flex items-center space-x-3">
          <img
            src="/avatar.png" // Replace with actual avatar URL or a placeholder
            alt="Avatar"
            className="w-8 h-8 rounded-full border border-white"
          />
          <div>
            <p className="text-sm font-semibold text-green-300">{post.username}</p>
            <p className="text-xs text-gray-200">@{post.email?.split('@')[0]}</p>
          </div>
        </div>
        <button onClick={() => setShowOptions(!showOptions)}>
          <FiMoreVertical className="text-white" />
        </button>
      </div>

      {/* Options Menu */}
      {showOptions && (
        <div className="absolute right-4 mt-2 w-60 bg-white border rounded shadow z-10">
          <ul className="text-sm text-gray-700">
            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onShare(post)}>
              <FiShare className="inline mr-2" /> Share the post
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }}
            >
              <FiLink className="inline mr-2" /> Copy the link to post
            </li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">
              <FiFlag className="inline mr-2" /> Report
            </li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">
              <FiBookmark className="inline mr-2" /> Mark as important
            </li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">
              <FiInfo className="inline mr-2" /> About profile
            </li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">
              <MdGavel className="inline mr-2" /> Visit guidelines
            </li>
            <li
              className="p-2 hover:bg-red-100 text-red-600 cursor-pointer"
              onClick={handleDelete}
            >
              <FiTrash2 className="inline mr-2" /> Delete
            </li>
          </ul>
        </div>
      )}

      {/* Title */}
      <div className="px-4 py-2">
        <h2 className="font-bold text-base text-black">{post.title}</h2>
      </div>

      {/* Image(s) */}
      {post.image_url && (
        <div className="px-4 grid grid-cols-3 gap-1">
          {post.image_url.split(',').map((url, idx) => (
            <img
              key={idx}
              src={url.trim()}
              alt={`Post Image ${idx + 1}`}
              className="object-cover w-full h-24 rounded"
            />
          ))}
        </div>
      )}

      {/* Content Snippet */}
      <div className="px-4 pt-2 pb-3">
        <p className="text-sm text-gray-700">
          {post.content.length > 120 ? (
            <>
              {post.content.slice(0, 120)}...{' '}
              <span className="text-green-600 font-medium cursor-pointer">more</span>
            </>
          ) : (
            post.content
          )}
        </p>
      </div>

      {/* Action Bar */}
      <div className="bg-green-100 text-sm text-black flex justify-between items-center px-4 py-2">
        <div className="flex items-center space-x-3">
          <button onClick={() => onVote(post.id, 1)} className="flex items-center space-x-1">
            <FiThumbsUp className="text-green-700" />
            <span className="text-green-700">{votes}</span>
          </button>
          <div className="flex items-center space-x-1">
            <span role="img" aria-label="downvote">
              👎
            </span>
            <span>09</span>
          </div>
          <button
            onClick={() => onToggleComments(post.id)}
            className="flex items-center space-x-1"
          >
            <FiMessageSquare />
            <span>{post.comments_count || 0} Comments</span>
          </button>
        </div>
        <button onClick={() => onShare(post)} className="flex items-center space-x-1">
          <FiShare />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
