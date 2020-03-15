'use strict';
const Participant = require('./Participant')
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const WhenAvailable = sequelize.define('WhenAvailable', {
    date: DataTypes.DATE,
    hours: DataTypes.ARRAY(Sequelize.TEXT)
  }, {});
  WhenAvailable.associate = function (models) {
    WhenAvailable.belongsTo(models.Participant)
  };
  return WhenAvailable;
};