require('dotenv').config()

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize express, define dev port
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static directory
app.use(express.static('client'));

// bring in API routes
require("./routes/api-routes.js")(app);


// Serve static files, handle React routing, return all requests to the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port: ${port}`));
