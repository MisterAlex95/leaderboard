const express = require('express');
const router = express.Router();
const { Player } = require('../../models');
const db = require('../../models/');

/**
 * 
 * @param res
 * @param req
 * @returns
 */
function checkParameters(res, req) {
  const name = req.params.playerName;
  const regex = /[^a-zA-Z-_\d\s:]/;

  if (name === null || name === '') {
    return {
      error: 'Missing player name parameter'
    };
  }

  if (name.match(regex)) {
    return {
      error: 'Player name not authorized'
    };
  }

  return { name: name };
}

/**
 * 
 * @param parameters { name }
 * @param res
 * @returns
 */
async function sequelizeQuery(parameters, res) {
  const players = await db
    .sequelize.query(`SELECT *, (SELECT COALESCE(MAX(id), 0) FROM Players) as total FROM (SELECT *, RANK() OVER (ORDER BY score DESC) rank FROM Players) WHERE name = '${parameters.name}'`, {
      model: Player
    });

  if (players.length == 0)
    return res.status(404).json({ message: "Player is not found" }).end();

  return res.status(200).json(players[0]).end();
}

router.get('/:playerName', function (req, res) {
  // Retrieves query parameters.
  const parameters = checkParameters(res, req);

  // Check errors
  if (parameters.error) {
    return res.status(500).json(parameters);
  }

  return sequelizeQuery(parameters, res);
});

module.exports = router;
