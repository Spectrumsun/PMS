'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SubLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      males: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      females: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      locationId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        allowNull: false,
        references: {
          model: 'Locations',
          key: 'id',
          as: 'location',
        },
      },
      totalResidents: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SubLocations');
  }
};