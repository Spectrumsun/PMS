'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    population: {
      allowNull: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
  }, {});
  Location.associate = function(models) {
    Location.hasMany(models.SubLocation, {
      foreignKey: 'locationId',
      as: 'subLocation'
    });
  };
  return Location;
};