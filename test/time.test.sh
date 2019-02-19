#!/bin/sh
echo "\n--------\nTime to GET top"
time curl localhost:3001/leaderboard/top
echo "\n--------\nTime to GET Rank of player:47050"
time (curl localhost:3001/leaderboard/rank/player:47050)
echo "\n--------\nTime to POST new score for alex"
time (curl --data "score=1215" -X POST localhost:3001/leaderboard/add/alex)
