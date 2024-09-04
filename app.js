const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Simulated database
const users = [
  { username: 'user', password: '############' } 
];

// Route to display the login form
app.get('/login', (req, res) => {
  res.render('login');
});

// Route to handle login form submission
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return res.send('Login successful!');
    }
  }
  res.send('Invalid username or password.');
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
