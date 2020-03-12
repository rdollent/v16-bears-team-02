'use strict'
const Participant = require('./Participant')
module.exports = (sequelize, DataTypes) => {
    const Meeting = sequelize.define('Meeting', {
        name: {
            type: DataTypes.STRING,
            defaultValue: 'Meeting',
        },
    }, {})
    Meeting.associate = function (models) {
        //associations can be defined here
        Meeting.hasMany(models.Participant)
    }
    return Meeting
}

