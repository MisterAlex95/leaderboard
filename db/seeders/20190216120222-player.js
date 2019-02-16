'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Players', [{
      name: 'Alex',
      score: Math.floor(Math.random() * Math.floor(12000)),
      createdAt: Date.now(),
      updatedAt: Date.now()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Players', null);
  }
};
