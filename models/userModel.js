const db = require('../database/dbconnection');

const User = {
  findByUsername: (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  create: (username, hashedPassword, callback) => {
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  findAll: (callback) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  updatePassword: (id, hashedPassword, callback) => {
    db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  deleteById: (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
};

module.exports = User;
