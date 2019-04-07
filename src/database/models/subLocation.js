'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubLocation = sequelize.define('SubLocation', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    males: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    females: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    totalResidents: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  SubLocation.associate = function(models) {
    SubLocation.belongsTo(models.Location, {
      foreignKey: 'locationId',
      as: 'location',
    });
  };
  return SubLocation;
};
