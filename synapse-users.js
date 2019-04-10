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
  }
);