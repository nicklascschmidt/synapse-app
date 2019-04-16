require('dotenv').config()

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Bring in routes, initialize express, define dev port
// const routes = require("./routes/api-routes.js");


const app = express();
const port = process.env.PORT || 5000;

require("./routes/api-routes.js")(app);

// ------------------------------------------------------
// ------------------- Server --------------------------
// ------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const routes = require('./routes');
// app.use('/', routes);

// Static directory
app.use(express.static('client'));
// app.use(routes);


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));