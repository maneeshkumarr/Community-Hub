const pool = require('../config/db');

const Post = {
  create: async ({ title, content, category, image }) => {
    const query = `INSERT INTO posts (title, content, category, image, createdAt) VALUES (?, ?, ?, ?, NOW())`;
    console.log('Executing Query:', query);
    console.log('With Parameters:', [title, content, category, image]);
    const [result] = await pool.execute(query, [title, content, category, image]);
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

  update: async (id, { title, content, category, image }) => {
    const query = `UPDATE posts SET title = ?, content = ?, category = ?, image = ? WHERE id = ?`;
    const [result] = await pool.execute(query, [title, content, category, image, id]);
    return result;
  },

  delete: async (id) => {
    const query = `DELETE FROM posts WHERE id = ?`;
    const [result] = await pool.execute(query, [id]);
    return result;
  },
};

module.exports = Post;