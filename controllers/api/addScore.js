const express = require('express');
const router = express.Router();
const { Player } = require('../../models');
const { rateLimiter } = require('../../redis/RateLimiter');

router.post('/:playerName', function (req, res) {
  const playerName = req.params.playerName;
  const score = Number(req.body.score);
  if (isNaN(score)) return res.status(500).json({ message: 'Score should be a number' });

  Player
    .findOne({ where: { name: playerName } })
    .then((player) => {
      if (!player) {
        Promise.resolve({ score, playerName })
          .then((_params) => {
            if (!_params || !_params.score || !_params.playerName || _params.playerName == '') {
              return Promise.reject({
                error: {
                  message: (!_params.score) ? 'Missing required parameters score' : 'Missing required header playerName'
                }
              });
            }
            return _params;
          })
          .then((_params) => {
            return Player.create({ name: _params.playerName, score: _params.score })
          })
          .then((data) => {
            res.status(200).end();
          })
          .catch((err) => {
            res.status(500).json({ message: "An unhandled exception happened" }).end();
          })
      } else {
        if (!score) {
          res.status(500).json({ message: "Missing required parameters score" }).end();
        } else {
          rateLimiter(playerName, (limitReach) => {
            if (limitReach) {
              Player.update({
                name: playerName,
                score: req.body.score
              }, {
                  where:
                  {
                    name: playerName
                  }
                })
                .then((rowsUpdated) => {
                  if (rowsUpdated)
                    res.end();
                  else
                    res.status(500).json({ message: "An unhandled exception happened" }).end();
                });
            } else {
              res.status(500).json({ message: "Too many requests" }).end();
            }
          });
        }
      }
    });
});

module.exports = router;
