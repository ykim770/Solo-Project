const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const PORT = 3000;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files from the client folder
// app.use('/client', express.static(path.resolve(__dirname, '../client')));
// statically server everything in the build folder on the route '/build'
// app.use('/build', express.static(path.join(__dirname, '../build')));
// serve the home page
// ! should I be serving from build?
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get('/api', (req, res) => {
  // console.log('returning a response to /api');
  return res.status(200).json({ express: 'express is live' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found, default 404 handler in server.js');
});

// add a global error handler

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
module.exports = app;
