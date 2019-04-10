var express = require('express');
var userController = require('../../controllers/users');
var router = express.Router();

// matches /api/users/_______
router.route('/create')
  .get(userController.create);
  
router.route('/findAll')
  .get(userController.findAll);

module.exports = router;