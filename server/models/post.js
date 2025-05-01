const pool = require('../config/db');

const Post = {
  create: async ({ user_id, title, content, category, image_url }) => {
    const query = `INSERT INTO posts (user_id, title, content, category, image_url, created_at) VALUES (?, ?, ?, ?, ?, NOW())`;
    console.log('Executing Query:', query);
    console.log('With Parameters:', { user_id, title, content, category, image_url });
    const [result] = await pool.execute(query, [user_id, title, content, category, image_url]);
    console.log('Insert Result:', result);
    return result;
  },

  findAll: async () => {
    const query = `SELECT * FROM posts`;
    const [rows] = await pool.execute(query);
    return rows;
  },

  findById: async (id) => {
    const query = `SELECT * FROM posts WHERE id = ?`;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  },

  update: async (id, { title, content, category, image_url }) => {
    const query = `UPDATE posts SET title = ?, content = ?, category = ?, image_url = ? WHERE id = ?`;
    const [result] = await pool.execute(query, [title, content, category, image_url, id]);
    return result;
  },

  delete: async (id) => {
    console.log('Deleting Post with ID:', id);
    const query = `DELETE FROM posts WHERE id = ?`;
    const [result] = await pool.execute(query, [id]);
    console.log('Delete Result:', result);
    return result;
  },
};

module.exports = Post;