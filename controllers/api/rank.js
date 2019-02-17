const express = require('express');
const router = express.Router();
const { Player } = require('../../models');
const db = require('../../models/');

router.get('/:playerName', function (req, res) {
  const playerName = req.params.playerName;

  db.sequelize
    .query(`SELECT *, (SELECT COALESCE(MAX(id)+1, 0) FROM Players) as total FROM (SELECT *, RANK() OVER (ORDER BY score DESC) rank FROM Players) WHERE name = '${playerName}'`, {
      model: Player,
    })
    .then((players) => {
      if (players.length == 0)
        res.status(404).json({ message: "Player is not found" }).end();
      else
        res.status(200).json(players[0]).end();
    })
    .catch((err) => {
      res.status(500).json({ message: "An unhandled exception happened" }).end();
    })
});

module.exports = router;
