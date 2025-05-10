const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// Serve static files from the app directory
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`FitSocial app running at http://localhost:${port}`);
  console.log('Open your browser to view the app');
}); 