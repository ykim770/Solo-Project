const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const apiRouter = require('./routes/api');

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

// direct all requests to /api to the apiRouter
app.use('/api', apiRouter);

// basic backend check, on localhost:8080 this should show the string 'express is live'
app.get('/express', (req, res) => {
  // console.log('returning a response to /api');
  return res.status(200).json({ express: 'express is live' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found, default 404 handler in server.js');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
module.exports = app;
