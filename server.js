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

// Global scope
let user;

app.get('/login/:id', (req, res) => {
  let options = {
    _id: req.params.id, // USER_ID
    fingerprint: process.env.FINGERPRINT, // USER_FINGERPRINT
    ip_address: Helpers.getUserIP(),
    full_dehydrate: 'yes' //optional
  };

  Users.get(
    client,
    options,
    function (errResp, userResponse) {
      user = userResponse;

      if (errResp) {
        res.status(errResp.status).send(errResp.body);
      } else {
        res.send(userResponse.json);
      }
    }
  );
});

// Imports
const Nodes = SynapsePay.Nodes;

let nodes;

app.get('/nodes/get-all', (req, res) => {
  console.log('/nodes/get-all HIT!!');
  console.log('user',user);
  // Get All Nodes
  Nodes.get(
    user,
    null,
    function (err, nodesResponse) {
      // error or array of node objects
      nodes = nodesResponse;
      console.log('nodes',nodes);
    }
  );
  res.json(nodes);
});





// ------------------------------------------------------
// ------------------- Server --------------------------
// ------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const routes = require('./routes');
// app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));