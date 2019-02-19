const express = require('express');
const router = express.Router();
const { Player } = require('../../models');
const { rateLimiter } = require('../../redis/RateLimiter');

/**
 * 
 * @param parameters {name, score}
 * @param res
 * @returns
 */
async function createPlayerScore(parameters, res) {
  const player = await Player.create({ name: parameters.name, score: parameters.score })

  if (!player)
    return res.status(500).json({ message: "An unhandled exception happened" }).end();
  return res.status(200).end();
}

/**
 * 
 * @param parameters {name, score}
 * @param res
 * @returns
 */
async function updatePlayerScore(parameters, res) {
  const rowsUpdated = await Player.update(parameters, { where: { name: parameters.name } });
  if (!rowsUpdated)
    return res.status(500).json({ message: "An unhandled exception happened" }).end();
  return res.end();
}

/**
 * 
 * @param parameters {name, score}
 * @param res
 * @returns
 */
async function gestionScore(parameters, res) {
  await rateLimiter(parameters.name, (canIRetrieveScores) => {
    if (!canIRetrieveScores)
      return res.status(500).json({ message: "Too many requests" }).end();
  });

  const player = await Player.findOne({ where: { name: parameters.name } });

  if (!player) {
    return createPlayerScore(parameters, res)
  } else {
    return updatePlayerScore(parameters, res);
  }  
}

/**
 * 
 * @param res
 * @param req
 * @returns
 */
function checkParameters(res, req) {
  const name = req.params.playerName;
  let score = req.body.score;

  if (name === null) {
    return {error: 'Missing player name parameter'};
  }
  if (score === null) {
    return {error: 'Missing score parameter' };
  }
  score = Number(score);
  if (isNaN(score)) {
    return {error:  'Score should be a number' };
  }

  return {
    score: score,
    name: name
  }
}

router.post('/:playerName', function (req, res) {
  // Retrieves query parameters.
  const parameters = checkParameters(res, req);

  // Check errors
  if (parameters.error) {
    return res.status(500).json(parameters);
  }
  return gestionScore(parameters, res);
});

module.exports = { router, checkParameters };
