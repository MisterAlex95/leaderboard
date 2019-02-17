const express = require('express');
const router = express.Router();
const { Player } = require('../../models');
const RT = require('../../redis/RateLimiter');

router.post('/:playerName', function (req, res) {
  const playerName = req.params.playerName;
  const score = Number(req.body.score);
  if (isNaN(score)) {
    return res.json({ code: 500, message: 'Score should be a number' });
  }

  Player.findOne({
    where: {
      name: playerName
    }
  }).then(function (player) {
    if (!player) {
      Promise.resolve({
        score, playerName
      }).then((_params) => {
        if (!_params || !_params.score || !_params.playerName || _params.playerName == '') {
          return Promise.reject({
            error: {
              message: (!_params.score) ? 'Missing required parameters score' : 'Missing required header name'
            }
          });
        }
        return _params;
      }).then((_params) => {
        return Player.create({ name: _params.playerName, score: _params.score })
      }).then((data) => {
        res.json({ statusCode: 200, message: "OK" }).end();
        // res.json({ data }).end();
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          error: {
            code: err.code || 500,
            message: err.message || err.code,
          }
        }).end();
      })
    } else {
      if (!score) {
        res.status(500).json({ statusCode: 500, message: "Missing required parameters score" }).end();
      } else {
        RT.rateLimiter(playerName, (limitReach) => {
          if (limitReach) {
            Player.update({
              name: playerName,
              score: req.body.score
            }, {
                where:
                {
                  name: playerName
                }
              }).then((rowsUpdated) => {
                if (rowsUpdated)
                  res.json({ statusCode: 200, message: "OK" }).end();
                else
                  res.status(500).json({ statusCode: 500, message: "An unhandled exception happened" }).end();
              });
          } else {
            res.status(500).json({ statusCode: 500, message: "Too many requests" }).end();
          }
        });
      }
    }
  });
});

module.exports = router;
