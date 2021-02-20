'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      refImageId: {
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.INTEGER
      },
      accepted: {
        type: Sequelize.BOOLEAN
      },
      done: {
        type: Sequelize.BOOLEAN
      },
      paid: {
        type: Sequelize.BOOLEAN
      },
      imageURL: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {tableName: 'Users'},
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      ArtistId: {
        type: Sequelize.INTEGER,
        references: {
          model: {tableName: 'Artists'},
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      ReviewId: {
        type: Sequelize.INTEGER,
        references: {
          model: {tableName: 'Reviews'},
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'SET NULL'
      },
      RatingId: {
        type: Sequelize.INTEGER,
        references: {
          model: {tableName: 'Ratings'},
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'SET NULL'
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};