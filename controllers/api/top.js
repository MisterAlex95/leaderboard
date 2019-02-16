const express = require('express');
const router = express.Router();
const { Player } = require('../../models');

router.post('/', function (req, res) {
  Player.findAll({
    order: [['score', 'DESC']],
    limit: 3
  }).then((players) => {
    res.json(players).end();
  })
});

module.exports = router;
