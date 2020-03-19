'use strict';
const Meeting = require('./Meeting')
const WhenAvailable = require('./whenavailable')

module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mark: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {})
  Participant.associate = function (models) {
    //associations can be defined here
    Participant.belongsTo(models.Meeting)
    Participant.hasMany(models.WhenAvailable)
  }
  return Participant;
}

