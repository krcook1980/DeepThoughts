// set up express and db
const express = require('express');
const db = require('./config/connection');

// set up port
const PORT = process.env.PORT || 3001;

// set up express app
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// open server port
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port localhost:${PORT}!`);
  });
});