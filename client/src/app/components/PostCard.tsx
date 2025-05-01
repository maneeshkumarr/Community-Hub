'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, MoreVertical } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  email: string;
  image_url?: string;
  upvotes?: number;
  downvotes?: number;
  comments_count?: number;
  comments?: string[];
}

interface PostCardProps {
  post: Post;
  onShare: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onShare, onEdit, onDelete }) => {
  const [vote, setVote] = useState<null | 'up' | 'down'>(null);
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const [downvotes, setDownvotes] = useState(post.downvotes || 0);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleVote = (type: 'up' | 'down') => {
    if (vote === type) return;
    if (type === 'up') {
      setUpvotes(upvotes + 1);
      if (vote === 'down') setDownvotes(downvotes - 1);
    } else {
      setDownvotes(downvotes + 1);
      if (vote === 'up') setUpvotes(upvotes - 1);
    }
    setVote(type);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-[#E3FAE5] rounded-xl shadow-md border border-gray-300 mb-4 overflow-hidden text-sm relative">
      <div className="bg-[#003049] text-white px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/default-avatar.webp"
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <p className="text-xs font-bold text-green-300">{post.username}</p>
            <p className="text-[10px] text-gray-300">@{post.email.split('@')[0]}</p>
          </div>
        </div>
        <div className="relative" ref={menuRef}>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Options">
            <MoreVertical className="text-white" size={20} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-md text-sm z-10">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  onEdit(post);
                  setMenuOpen(false);
                }}
              >
                ✏️ Edit
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                onClick={() => {
                  onDelete(post.id);
                  setMenuOpen(false);
                }}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pt-2 pb-1">
        <p className="font-semibold text-sm text-black">{post.title}</p>
        <p className="text-[12px] text-gray-700 mt-1">{post.content}</p>
      </div>

      {post.image_url && (
        <div className="px-4 py-2">
          <Image
            src={post.image_url}
            alt="Post Image"
            width={500}
            height={300}
            className="rounded-md object-cover"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}

      <div className="bg-[#C6F3CC] px-4 py-2 flex justify-between items-center text-xs font-medium text-gray-700">
        <div className="flex items-center gap-3">
          <button
            className={`flex items-center gap-1 ${vote === 'up' ? 'text-green-700 font-bold' : ''}`}
            onClick={() => handleVote('up')}
          >
            <ThumbsUp size={14} />
            {upvotes}
          </button>
          <button
            className={`flex items-center gap-1 ${vote === 'down' ? 'text-red-600 font-bold' : ''}`}
            onClick={() => handleVote('down')}
          >
            <ThumbsDown size={14} />
            {downvotes}
          </button>
          <button
            className="flex items-center gap-1"
            onClick={() => setCommentsVisible(!commentsVisible)}
          >
            <MessageCircle size={14} />
            {post.comments_count || 0} Comments
          </button>
        </div>

        <button onClick={() => onShare(post)} className="flex items-center gap-1">
          <Share2 size={14} />
          Share
        </button>
      </div>

      {commentsVisible && (
        <div className="px-4 py-2 text-xs bg-white border-t border-gray-200">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((c, i) => (
              <p key={i} className="text-gray-600 mb-1">
                {c}
              </p>
            ))
          ) : (
            <p className="italic text-gray-400">No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
