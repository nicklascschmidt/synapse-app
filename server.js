require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// ------------------------------------------------------
// ------------------- Synapse --------------------------
// ------------------------------------------------------

const SynapsePay = require('synapsepay');
const Clients = SynapsePay.Clients;
const Helpers = SynapsePay.Helpers;

const client = new Clients(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  // is_production boolean determines sandbox or production endpoints used
  false
);

// Imports
const Users = SynapsePay.Users;

// Get All Users
let options = {
  ip_address: Helpers.getUserIP(),
  page: '', //optional
  per_page: '', //optional
  query: '' //optional
};

let users;
Users.get(
  client,
  options,
  function(err, usersResponse) {
    // error or array of user objects
    users = usersResponse;
    console.log('users',users);
    (err) && console.log('err',err);
  }
);




// ------------------------------------------------------
// ------------------- Server --------------------------
// ------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes');
app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));