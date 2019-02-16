const express = require('express');
const router = express.Router();

router.use('/top/', require('./top'));
router.use('/rank/', require('./rank'));
router.use('/add/', require('./addScore'));
module.exports = router;
