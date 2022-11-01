const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());

// serve static files from the client folder
app.use('/client', express.static(path.resolve(__dirname, '../client')));

// serve the home page
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/api', (req, res) => {
  return res.status(200).json({ log: 'Request to api worked' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found, default 404 handler in server.js');
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
module.exports = app;
