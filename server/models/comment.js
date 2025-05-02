const pool = require('../config/db');

const Comment = {
  create: async ({ post_id, user_id, content }) => {
    const query = `INSERT INTO comments (post_id, user_id, content, created_at) VALUES (?, ?, ?, NOW())`;
    const [result] = await pool.execute(query, [post_id, user_id, content]);
    return result;
  },

  // ✅ Updated: Fetch comments for a specific post with the username
  findAllByPostId: async (post_id) => {
    const query = `
      SELECT c.id, c.post_id, c.user_id, u.username, c.content, c.created_at
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at ASC
    `;
    const [rows] = await pool.execute(query, [post_id]);
    return rows;
  },

  // Optional: also update findAll to include usernames (if needed)
  findAll: async () => {
    const query = `
      SELECT c.id, c.post_id, c.user_id, u.username, c.content, c.created_at
      FROM comments c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at ASC
    `;
    const [rows] = await pool.execute(query);
    return rows;
  },

  update: async (id, { content }) => {
    const query = `UPDATE comments SET content = ? WHERE id = ?`;
    const [result] = await pool.execute(query, [content, id]);
    return result;
  },

  delete: async (id) => {
    const query = `DELETE FROM comments WHERE id = ?`;
    const [result] = await pool.execute(query, [id]);
    return result;
  },
};

module.exports = Comment;
