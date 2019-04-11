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
const Nodes = SynapsePay.Nodes;

// Global scope vars
let user;
let nodes;
let node;
let transaction;

// Get user from API with userId, save in 'user' var.
app.get('/user/login/:id', (req, res) => {
  let options = {
    _id: req.params.id, // USER_ID
    fingerprint: process.env.FINGERPRINT, // USER_FINGERPRINT
    ip_address: Helpers.getUserIP(),
    full_dehydrate: 'yes' //optional
  };

  Users.get(
    client,
    options,
    function (err, userResponse) {
      user = userResponse;

      if (err) {
        res.status(err.status).send(err.body);
      } else {
        res.send(userResponse.json);
      }
    }
  );
});

// Create a User on home page (login)
app.get('/user/create/:name', (req, res) => {
  const createPayload = {
    logins: [
      {
        email: `jsTestUser${req.params.name}@synapsepay.com`,
        read_only: false
      }
    ],
    phone_numbers: [
      '901.111.1111'
    ],
    legal_names: [
      `${req.params.name}`
    ],
    extra: {
      note: `Test user: ${req.params.name}`,
      supp_id: '122eddfgbeafrfvbbb',
      is_business: false
    }
  };
  
  Users.create(
    client,
    // fingerprint (specific to user or static for application)
    process.env.FINGERPRINT,
    Helpers.getUserIP(),
    createPayload,
    function(err, userResponse) {
      user = userResponse;
      if (err) {
        res.status(err.status).send(err.body);
      } else {
        res.send(userResponse);
      }
    }
  );
});


// ------------------- Nodes --------------------------

// Create node on home page, function called after user is created.
app.get('/nodes/create', (req, res) => {

  // Add ACH-US Node through Account and Routing Number Details
  const achPayload = {
    type: 'ACH-US',
    info: {
      nickname: 'Node Library Checking Account',
      name_on_account: 'Node Library',
      account_num: '72347235423',
      routing_num: '051000017',
      type: 'PERSONAL',
      class: 'CHECKING'
    },
    extra: {
      supp_id: '123sa'
    }
  };
  console.log('achPayload',achPayload);

  Nodes.create(
    user,
    achPayload,
    function(err, nodesResponse) {
      // error or node object
      // node will only have RECEIVE permission until verified with micro-deposits
      nodes = nodesResponse;
      console.log('nodesResponse',nodesResponse);
      if (err) {
        res.status(err.status).send(err.body);
      } else {
        res.end();
      }
    }
  );

  // let mfa;

  // Nodes.create(
  //   user,
  //   achPayload,
  //   function(err, nodeResponse) {
  //     // error with MFA questions or node object
  //     mfa = err.body.mfa;
  //     console.log('mfa',mfa);
  //     nodes = nodesResponse;
  //     console.log('nodesResponse',nodesResponse);
  //     if (err) {
  //       res.status(err.status).send(err.body);
  //     } else {
  //       // res.send(nodesResponse);
  //       console.log('\nsuccess\n');
  //     }
  //   }
  // );
});
  

// Get All Nodes
app.get('/nodes/get-all', (req, res) => {
  console.log('/nodes/get-all HIT!!');
  Nodes.get(
    user,
    null,
    function (err, nodesResponse) {
      nodes = nodesResponse;
      if (err) {
        res.status(err.status).send(err.body);
      } else {
        res.send(nodesResponse.nodes);
      }
    }
  );
});

// Get a Specific Node
app.get('/nodes/get-one/:id', (req, res) => {
  console.log('/nodes/get-one/:id hit');

  Nodes.get(
    user,
    {
      _id: req.params.id,
      full_dehydrate: 'yes' //optional
    },
    function(err, nodeResponse) {
      node = nodeResponse;
      if (err) {
        res.status(err.status).send(err.body);
      } else {
        res.end();
      }
    }
  );
});


// ------------------- Transactions --------------------------

// Imports
const Transactions = SynapsePay.Transactions;

// Create transaction
app.get('/transactions/add', async (req, res) => {
  // params accessible in req.query
  console.log('HIT /transactions/add');
  // console.log('user',user);

  // Create a Transaction. Ignore fees bc not production.
  const createPayload = {
    to: {
      type: 'SYNAPSE-US',
      id: req.query.activeNodeId // TO_NODE_ID
    },
    amount: {
      amount: parseFloat(req.query.transactionAmt),
      currency: 'USD'
    },
    extra: {
      supp_id: '1283764wqwsdd34wd13212',
      note: 'TEST - Deposit to bank account',
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

  Transactions.create(
    node,
    createPayload,
    function (err, transactionResp) {
      // error or transaction object
      transaction = transactionResp;
      console.log('transaction',transaction);
      if (err) {
        res.status(err.status).send(err.body);
      } else {
        res.send(transactionResp.json);
      }
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