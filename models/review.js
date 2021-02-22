'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsToMany(models.User, {
        through: models.Order
      })
      Review.belongsTo(models.Artist)
    }
  };
  Review.init({
    title: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty: {
          msg: 'Title required'
        }
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty: {
          msg: 'Description required'
        }
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'UserId required'
        }
      },
    },
    ArtistId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'ArtistId required'
        }
      },
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};