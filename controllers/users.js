const axios = require('axios');
require('dotenv').config()
const Synapse = require('synapsenode');
const Client = Synapse.Client;


// Methods
module.exports = {
  // Add user
  create: function(req,res) {
    console.log('\ntesting hello\n');
    res.send('testing hello');
    // db.User
    //   .create(req.body)
    //   .then(dbUser => res.json(dbUser))
    //   .catch(err => res.status(422).json(err));
  },
  findAll: function(req,res) {
    res.send(process.env.CLIENT_SECRET)
    // const client = new Client({
    //   client_id: '<client_id>',
    //   client_secret: '<client_secret>',
    //   fingerprint: '<fingerprint>',
    //   ip_address: '<ip_address>',
    //   // isProduction boolean determines if production (true) or sandbox (false) endpoint is used
    //   isProduction: false
    // });


    // axios.get('https://uat-api.synapsefi.com/v3.1/users')
    //   .then( (data) => {
    //     console.log('data',data)
    //     res.send('ok');
    //     // if (res.status === 200) {
    //     //   res.send(data);
    //     // } else {
    //     //   res.send(data);
    //     // }
    //   })
    //   .catch(err => res.status(422).json(err));
  }
  // // Check user login credentials
  // findOne: function(req,res) {
  //   db.User
  //     .findOne({ where: req.query })
  //     .then(dbUser => res.json(dbUser))
  //     .catch(err => res.status(422).json(err));
  // }
};
