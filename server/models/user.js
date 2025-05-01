const pool = require('../config/db');

const User = {
  create: async ({ username, email, password_hash }) => {
    const query = `INSERT INTO users (username, email, password_hash, created_at) VALUES (?, ?, ?, NOW())`;
    const [result] = await pool.execute(query, [username, email, password_hash]);
    return result;
  },

  findAll: async () => {
    const query = `SELECT * FROM users`;
    const [rows] = await pool.execute(query);
    return rows;
  },

  findById: async (id) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  },

  update: async (id, { username, email, password_hash }) => {
    const query = `UPDATE users SET username = ?, email = ?, password_hash = ? WHERE id = ?`;
    const [result] = await pool.execute(query, [username, email, password_hash, id]);
    return result;
  },

  delete: async (id) => {
    const query = `DELETE FROM users WHERE id = ?`;
    const [result] = await pool.execute(query, [id]);
    return result;
  },
};

module.exports = User;