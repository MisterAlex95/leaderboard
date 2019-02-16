const express = require('express');
const router = express.Router();

router.use('/leaderboard', require('./api'));

module.exports = router;
