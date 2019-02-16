const express = require('express');
const router = express.Router();
const { pick } = require('lodash');
const { Player } = require('../../db/models');

router.post('/:playerName', function (req, res) {
  const playerName = req.params.playerName;

  Player.findAll({
    where: {
      name: playerName
    }
  }).then(function (players) {
    if (players.size == 0 || !players[0]) {
      Promise.resolve({
        ...pick(req.body, ['score']), playerName
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
      }).then((fos) => {
        res.json({ data: fos }).end();
      }).catch((err) => {
        console.log(err);
        res.json({
          error: {
            code: err.code || 500,
            message: err.message || err.code,
          }
        }).end();
      })
    } else {
      Player.update(
        {
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
            res.json({ statusCode: 200, message: "OK" }).end();
          else
            res.json({ statusCode: 500, message: "An unhandled exception happened" }).end();
        });
    }
  });
});

module.exports = router;
