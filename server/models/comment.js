const pool = require('../config/db');

const Comment = {
  create: async ({ post_id, user_id, content }) => {
    const query = `INSERT INTO comments (post_id, user_id, content, created_at) VALUES (?, ?, ?, NOW())`;
    const [result] = await pool.execute(query, [post_id, user_id, content]);
    return result;
  },

  findAllByPostId: async (post_id) => {
    const query = `SELECT * FROM comments WHERE post_id = ?`;
    const [rows] = await pool.execute(query, [post_id]);
    return rows;
  },

  findAll: async () => {
    const query = `SELECT * FROM comments`;
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