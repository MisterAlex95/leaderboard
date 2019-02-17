'use strict';

function generatePlayers() {
  const players = [];

  for (let i = 0; i < 100000; i++) {
    players.push({
      name: `player:${i}`,
      score: Math.floor(Math.random() * Math.floor(1000000)),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  return players;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Players', generatePlayers());
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Players', null);
  }
};
