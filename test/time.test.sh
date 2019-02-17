#!/bin/sh
echo "\n--------\nTime to GET top"
time curl --silent --output /dev/null localhost:3001/leaderboard/top
echo "\n--------\nTime to GET Rank of Alex:47050"
time (curl --silent --output /dev/null localhost:3001/leaderboard/rank/Alex:47050)
echo "\n--------\nTime to POST new score for alex"
time (curl --silent --output /dev/null --data "score=1215" -X POST localhost:3001/leaderboard/add/alex)
