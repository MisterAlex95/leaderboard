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
    .then(player => {
      res.json(player).end();
    })
});

module.exports = router;
