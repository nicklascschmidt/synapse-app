const express = require('express');
const router = express.Router();
const apiRoutes = require("./api");
// const path = require('path');

// Matches with /_____
router.use('/api', apiRoutes);

// router.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../','client','public','index.html'));
// })

module.exports = router;