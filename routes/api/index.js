const router = require("express").Router();
const userRoutes = require("./users");

// Matches with /api/_____
router.use("/users", userRoutes);

module.exports = router;
