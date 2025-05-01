const pool = require('../config/db');

const Vote = {
  create: async ({ post_id, user_id, value }) => {
    const query = `INSERT INTO votes (post_id, user_id, value, created_at) VALUES (?, ?, ?, NOW())`;
    const [result] = await pool.execute(query, [post_id, user_id, value]);
    return result;
  },

  findAllByPostId: async (post_id) => {
    const query = `SELECT * FROM votes WHERE post_id = ?`;
    const [rows] = await pool.execute(query, [post_id]);
    return rows;
  },

  findById: async (id) => {
    const query = `SELECT * FROM votes WHERE id = ?`;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  },

  findAll: async () => {
    const query = `SELECT * FROM votes`;
    const [rows] = await pool.execute(query);
    return rows;
  },

  update: async (id, { value }) => {
    const query = `UPDATE votes SET value = ? WHERE id = ?`;
    const [result] = await pool.execute(query, [value, id]);
    return result;
  },

  delete: async (id) => {
    const query = `DELETE FROM votes WHERE id = ?`;
    const [result] = await pool.execute(query, [id]);
    return result;
  },
};

module.exports = Vote;