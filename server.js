require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// ------------------------------------------------------
// ------------------- Synapse --------------------------
// ------------------------------------------------------


// ---------- Synapse Initialization / Client -----------

const SynapsePay = require('synapsepay');
const Clients = SynapsePay.Clients;
const Helpers = SynapsePay.Helpers;

const client = new Clients(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  // is_production boolean determines sandbox or production endpoints used
  false
);


// ------------------- Users --------------------------

// Imports
const Users = SynapsePay.Users;

// Global scope
let user;

// Get user from API with userId, save in 'user' var.
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


// ------------------- Nodes --------------------------

// Imports
const Nodes = SynapsePay.Nodes;

let nodes;

app.get('/nodes/get-all', (req, res) => {
  console.log('/nodes/get-all HIT!!');
  console.log('user', user);
  // Get All Nodes
  Nodes.get(
    user,
    null,
    function (errResp, nodesResponse) {
      nodes = nodesResponse;
      console.log('nodes', nodes);
      if (errResp) {
        res.status(errResp.status).send(errResp.body);
      } else {
        res.send(nodesResponse.nodes);
      }
    }
  );
});


// ------------------- Transactions --------------------------

// Imports
const Transactions = SynapsePay.Transactions;

app.get('/transactions/add/:amount', (req, res) => {
  console.log('HIT /transactions/add/:amount');
  console.log('req.params',req.params);
  
  // Create a Transaction
  const createPayload = {
    to: {
      type: 'SYNAPSE-US',
      id: '5cad55f170fe0a6f9fd36d37' // TO_NODE_ID TODO: return to variable
    },
    amount: {
      amount: 1.10, // TODO: req.params then turn into ## - parseInt()
      currency: 'USD'
    },
    extra: {
      supp_id: '1283764wqwsdd34wd13212',
      note: 'Deposit to bank account',
      webhook: 'http://requestb.in/q94kxtq9',
      process_on: 1,
      ip: Helpers.getUserIP()
    },
    // fees: [{
    //   fee: 1.00,
    //   note: 'Facilitator Fee',
    //   to: {
    //     id: FEE_TO_NODE_ID
    //   }
    // }]
  };

  let transaction;

  Transactions.create(
    node,
    createPayload,
    function (err, transactionResp) {
      // error or transaction object
      transaction = transactionResp;
    }
  );
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