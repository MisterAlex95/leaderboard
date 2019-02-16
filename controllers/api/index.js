const express = require('express');
const router = express.Router();

router.use('/add/', require('./Player'));
module.exports = router;
