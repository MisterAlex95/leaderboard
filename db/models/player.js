'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    name: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
      timestamps: true,
    });
  Player.associate = function (models) {
    // associations can be defined here
  };
  return Player;
};
