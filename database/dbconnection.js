// test-connection.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: '......',
  password: '.....',
  database: '....'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
  db.end();  // close the connection after testing
});
