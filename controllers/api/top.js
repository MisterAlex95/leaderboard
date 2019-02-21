const express = require('express');
const router = express.Router();
const { Player } = require('../../models');

router.get('/', function (req, res) {
  Player
    .findAll({
      order: [['score', 'DESC']],
      limit: 3
    })
    .then((players) => {
      let top = [];
      players.map((player) => {
        top.push({ name: player.name, score: player.score });
      });
      res.json({ top: top }).end();
    })
    .catch((err) => {
      res.status(500).json({ message: "An unhandled exception happened" }).end();
    });
});

module.exports = router;
