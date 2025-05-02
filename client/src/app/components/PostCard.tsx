import React from 'react';
import { FiThumbsUp, FiThumbsDown, FiMessageCircle, FiShare2, FiTrash2 } from 'react-icons/fi';

type Post = {
  id: number;
  title?: string | null;
  content?: string | null;
  username: string;
  email: string;
  image_url?: string;
  upvotes?: number;
  comments_count?: number;
  category?: string | null;
};

type Comment = {
  id: number;
  post_id: number;
  user_id: number;
  username?: string;
  content: string;
  created_at: string;
};

type Props = {
  post: Post;
  votes: number;
  onVote: (id: number, change: number) => void;
  onToggleComments: (id: number) => void;
  onShare: (post: Post) => void;
  onDelete: (id: number) => void;
  commentsVisible: boolean;
  comments: Comment[];
};

export default function PostCard({
  post,
  votes,
  onVote,
  onToggleComments,
  onShare,
  onDelete,
  commentsVisible,
  comments,
}: Props) {
  return (
    <div className="bg-white border rounded p-4 mb-4 shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{post.title || 'Untitled'}</h2>
        <span className="text-xs bg-green-200 text-green-900 px-2 py-1 rounded">{post.category || 'Uncategorized'}</span>
      </div>
      <p className="text-sm text-gray-700 mt-1">{post.content || 'No content available.'}</p>
      {post.image_url && (
        <img src={post.image_url} alt="Post" className="mt-2 w-full max-h-64 object-cover rounded" />
      )}
      <div className="text-xs text-gray-500 mt-2">
        Posted by {post.username} ({post.email})
      </div>
      <div className="flex items-center gap-4 mt-3 text-sm">
        <button onClick={() => onVote(post.id, 1)} className="flex items-center gap-1 text-green-700 hover:underline">
          <FiThumbsUp /> {votes}
        </button>
        <button onClick={() => onVote(post.id, -1)} className="flex items-center gap-1 text-red-700 hover:underline">
          <FiThumbsDown />
        </button>
        <button onClick={() => onToggleComments(post.id)} className="flex items-center gap-1 hover:underline">
          <FiMessageCircle /> Comments ({comments.length})
        </button>
        <button onClick={() => onShare(post)} className="flex items-center gap-1 hover:underline">
          <FiShare2 /> Share
        </button>
        <button onClick={() => onDelete(post.id)} className="flex items-center gap-1 text-red-600 hover:underline">
          <FiTrash2 /> Delete
        </button>
      </div>
      {commentsVisible && (
        <div className="mt-3 pl-4 border-l">
          {comments.length === 0 ? (
            <p className="text-sm text-gray-500">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="text-sm mb-2">
                <strong>{comment.username || 'Anonymous'}:</strong> {comment.content}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
