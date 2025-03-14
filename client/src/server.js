const express = require('express');
const path = require('path');
const app = express();

// Serve static files for the dashboard
app.use(express.static(path.join(__dirname, 'public')));

// Serve the React app
app.use(express.static(path.join(__dirname, 'build')));

// Serve dashboard.html at /dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Serve the React app at the root route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});